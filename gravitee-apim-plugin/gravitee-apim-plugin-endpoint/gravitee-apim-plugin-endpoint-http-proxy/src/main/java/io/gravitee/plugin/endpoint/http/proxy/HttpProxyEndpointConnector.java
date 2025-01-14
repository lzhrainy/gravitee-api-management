/**
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.gravitee.plugin.endpoint.http.proxy;

import static io.gravitee.gateway.jupiter.http.vertx.client.VertxHttpClient.buildUrl;
import static io.gravitee.plugin.endpoint.http.proxy.client.VertxHttpClientHelper.URI_QUERY_DELIMITER_CHAR_SEQUENCE;
import static io.netty.handler.codec.http.HttpHeaderNames.*;

import io.gravitee.common.http.HttpHeader;
import io.gravitee.el.TemplateEngine;
import io.gravitee.gateway.api.buffer.Buffer;
import io.gravitee.gateway.http.vertx.VertxHttpHeaders;
import io.gravitee.gateway.jupiter.api.ConnectorMode;
import io.gravitee.gateway.jupiter.api.connector.endpoint.sync.EndpointSyncConnector;
import io.gravitee.gateway.jupiter.api.context.DeploymentContext;
import io.gravitee.gateway.jupiter.api.context.ExecutionContext;
import io.gravitee.gateway.jupiter.api.context.Request;
import io.gravitee.gateway.jupiter.api.context.Response;
import io.gravitee.node.api.configuration.Configuration;
import io.gravitee.plugin.endpoint.http.proxy.client.VertxHttpClientHelper;
import io.gravitee.plugin.endpoint.http.proxy.configuration.HttpProxyEndpointConnectorConfiguration;
import io.reactivex.rxjava3.core.Completable;
import io.vertx.core.MultiMap;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.http.RequestOptions;
import io.vertx.core.http.impl.headers.HeadersMultiMap;
import io.vertx.rxjava3.core.Vertx;
import io.vertx.rxjava3.core.http.HttpClient;
import io.vertx.rxjava3.core.http.HttpHeaders;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicBoolean;
import lombok.extern.slf4j.Slf4j;

/**
 * @author Jeoffrey HAEYAERT (jeoffrey.haeyaert at graviteesource.com)
 * @author GraviteeSource Team
 */
@Slf4j
public class HttpProxyEndpointConnector extends EndpointSyncConnector {

    // Headers that are not allowed to be propagated to the endpoint.
    static final Set<CharSequence> HOP_HEADERS = Set.of(
        CONNECTION,
        KEEP_ALIVE,
        PROXY_AUTHORIZATION,
        PROXY_AUTHENTICATE,
        PROXY_CONNECTION,
        TE,
        TRAILER,
        UPGRADE
    );

    private static final String ENDPOINT_ID = "http-proxy";
    static final Set<ConnectorMode> SUPPORTED_MODES = Set.of(ConnectorMode.REQUEST_RESPONSE);

    protected final HttpProxyEndpointConnectorConfiguration configuration;
    private final AtomicBoolean httpClientCreated = new AtomicBoolean(false);
    private final String relativeTarget;
    private HttpClient httpClient;

    public HttpProxyEndpointConnector(HttpProxyEndpointConnectorConfiguration configuration) {
        this.configuration = configuration;

        final URL targetUrl = buildUrl(configuration.getTarget());
        this.relativeTarget =
            (targetUrl.getQuery() == null)
                ? targetUrl.getPath()
                : targetUrl.getPath() + URI_QUERY_DELIMITER_CHAR_SEQUENCE + targetUrl.getQuery();
    }

    @Override
    public String id() {
        return ENDPOINT_ID;
    }

    @Override
    public Set<ConnectorMode> supportedModes() {
        return SUPPORTED_MODES;
    }

    @Override
    public Completable connect(ExecutionContext ctx) {
        final Request request = ctx.request();
        final Response response = ctx.response();

        try {
            final HttpClient client = getOrBuildHttpClient(ctx);
            final RequestOptions options = buildRequestOptions(ctx);

            request.metrics().setEndpoint(options.getURI());

            return client
                .rxRequest(options)
                .flatMap(
                    httpClientRequest ->
                        httpClientRequest.rxSend(
                            request.chunks().map(buffer -> io.vertx.rxjava3.core.buffer.Buffer.buffer(buffer.getNativeBuffer()))
                        )
                )
                .doOnSuccess(
                    endpointResponse -> {
                        response.status(endpointResponse.statusCode());
                        response.chunks(endpointResponse.toFlowable().map(Buffer::buffer));
                    }
                )
                .ignoreElement();
        } catch (Exception e) {
            return Completable.error(e);
        }
    }

    @Override
    protected void doStop() {
        if (httpClient != null) {
            //noinspection ReactiveStreamsUnusedPublisher
            httpClient.close();
        }
    }

    private RequestOptions buildRequestOptions(ExecutionContext ctx) {
        final RequestOptions requestOptions = new RequestOptions();
        final Request request = ctx.request();
        final io.gravitee.gateway.api.http.HttpHeaders requestHeaders = request.headers();

        // Remove HOP-by-HOP headers
        for (CharSequence header : HOP_HEADERS) {
            requestHeaders.remove(header.toString());
        }

        if (!configuration.getHttpOptions().isPropagateClientAcceptEncoding()) {
            // Let the API Owner choose the Accept-Encoding between the gateway and the backend
            requestHeaders.remove(HttpHeaders.ACCEPT_ENCODING);
        }

        // Simply set the uri as 'absolute' to use the default target host and port defined on the http client.
        // TODO: support for dynamic endpoint will be handled in a dedicated task.
        VertxHttpClientHelper.configureAbsoluteUri(requestOptions, relativeTarget + request.pathInfo(), request.parameters());

        // Override any request headers that are configured at endpoint level.
        final List<HttpHeader> configHeaders = configuration.getHeaders();
        if (configHeaders != null && !configHeaders.isEmpty()) {
            configHeaders.forEach(header -> requestHeaders.set(header.getName(), header.getValue()));
        }

        if (requestHeaders instanceof VertxHttpHeaders) {
            // Avoid copying headers by reusing the original ones.
            requestOptions.setHeaders(((VertxHttpHeaders) requestHeaders).getDelegate());
        } else {
            final MultiMap headers = new HeadersMultiMap();
            requestHeaders.names().forEach(name -> headers.add(name, requestHeaders.getAll(name)));
            requestOptions.setHeaders(headers);
        }

        return requestOptions
            .setMethod(HttpMethod.valueOf(request.method().name()))
            .setTimeout(configuration.getHttpOptions().getReadTimeout())
            .setFollowRedirects(configuration.getHttpOptions().isFollowRedirects());
    }

    private HttpClient getOrBuildHttpClient(ExecutionContext ctx) throws MalformedURLException {
        if (httpClient == null) {
            synchronized (this) {
                // Double-checked locking.
                if (httpClientCreated.compareAndSet(false, true)) {
                    httpClient =
                        VertxHttpClientHelper.buildHttpClient(
                            ctx.getComponent(Vertx.class),
                            ctx.getComponent(Configuration.class),
                            configuration,
                            configuration.getTarget()
                        );
                }
            }
        }

        return httpClient;
    }
}
