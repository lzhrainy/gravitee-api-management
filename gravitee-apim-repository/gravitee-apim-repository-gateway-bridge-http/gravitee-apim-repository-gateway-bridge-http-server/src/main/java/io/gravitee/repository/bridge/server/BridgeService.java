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
package io.gravitee.repository.bridge.server;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.DeserializationFeature;
import io.gravitee.common.http.HttpStatusCode;
import io.gravitee.common.service.AbstractService;
import io.gravitee.repository.bridge.server.handler.*;
import io.gravitee.repository.bridge.server.http.configuration.HttpServerConfiguration;
import io.gravitee.repository.bridge.server.version.VersionHandler;
import io.vertx.core.Vertx;
import io.vertx.core.WorkerExecutor;
import io.vertx.core.json.jackson.DatabindCodec;
import io.vertx.ext.auth.authentication.AuthenticationProvider;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.AuthenticationHandler;
import io.vertx.ext.web.handler.BasicAuthHandler;
import io.vertx.ext.web.handler.BodyHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

/**
 * @author David BRASSELY (david.brassely at graviteesource.com)
 * @author Nicolas GERAUD (nicolas.geraud at graviteesource.com)
 * @author GraviteeSource Team
 */
public class BridgeService extends AbstractService {

    private static final Logger LOGGER = LoggerFactory.getLogger(BridgeService.class);

    private static final String PATH = "/_bridge";

    private static final String AUTHENTICATION_TYPE_NONE = "none";
    private static final String AUTHENTICATION_TYPE_BASIC = "basic";
    private static final String AUTHENTICATION_BASIC_REALM = "gravitee.io";

    @Autowired
    @Qualifier("vertxBridgeHttpServer")
    private io.vertx.core.http.HttpServer httpServer;

    @Autowired
    @Qualifier("bridgeRouter")
    private Router bridgeRouter;

    @Autowired
    private Vertx vertx;

    @Autowired
    @Qualifier("bridgeAuthProvider")
    private AuthenticationProvider authProvider;

    @Autowired
    private HttpServerConfiguration httpServerConfiguration;

    @Autowired
    @Qualifier("bridgeWorkerExecutor")
    private WorkerExecutor bridgeWorkerExecutor;

    @Override
    protected void doStart() throws Exception {
        if (httpServerConfiguration.isEnabled()) {
            super.doStart();
            LOGGER.info("Start HTTP server for bridge");

            configureMapper();

            // Start HTTP server
            Router mainRouter = Router.router(vertx);
            mainRouter.mountSubRouter(PATH, bridgeRouter);

            AuthenticationHandler authHandler = null;
            switch (httpServerConfiguration.getAuthenticationType().toLowerCase()) {
                case AUTHENTICATION_TYPE_NONE:
                    break;
                case AUTHENTICATION_TYPE_BASIC:
                    authHandler = BasicAuthHandler.create(authProvider, AUTHENTICATION_BASIC_REALM);
                    break;
                default:
                    throw new IllegalArgumentException(
                        "Unsupported Authentication type " + httpServerConfiguration.getAuthenticationType() + " for HTTP bridge service"
                    );
            }

            // Set security handler is defined
            if (authHandler != null) {
                mainRouter.route().handler(authHandler);
                bridgeRouter.route().handler(authHandler);
            }

            // Set default handler
            mainRouter.route().handler(ctx -> ctx.fail(HttpStatusCode.NOT_FOUND_404));

            bridgeRouter.route().handler(new VersionHandler());

            // Add request handler
            httpServer
                .requestHandler(mainRouter)
                .listen(event -> LOGGER.info("HTTP server for bridge listening on port {}", event.result().actualPort()));

            bridgeRouter.route().handler(BodyHandler.create());

            // Create and associate handler
            RootHandler rootHandler = new RootHandler();
            bridgeRouter.get("/").handler(rootHandler);

            // APIs handler
            ApisHandler apisHandler = new ApisHandler(bridgeWorkerExecutor);
            applicationContext.getAutowireCapableBeanFactory().autowireBean(apisHandler);
            bridgeRouter.get("/apis").handler(apisHandler::search);
            bridgeRouter.get("/apis/:apiId").handler(apisHandler::findById);

            // API Plans handler
            ApiPlansHandler apiPlansHandler = new ApiPlansHandler(bridgeWorkerExecutor);
            applicationContext.getAutowireCapableBeanFactory().autowireBean(apiPlansHandler);
            bridgeRouter.get("/apis/:apiId/plans").handler(apiPlansHandler::handle);

            // Plans handler
            PlansHandler plansHandler = new PlansHandler(bridgeWorkerExecutor);
            applicationContext.getAutowireCapableBeanFactory().autowireBean(plansHandler);
            bridgeRouter.post("/plans").handler(plansHandler::handle);

            // API Keys handler
            ApiKeysHandler apiKeysHandler = new ApiKeysHandler(bridgeWorkerExecutor);
            applicationContext.getAutowireCapableBeanFactory().autowireBean(apiKeysHandler);
            bridgeRouter.post("/keys/_findByCriteria").handler(apiKeysHandler::findByCriteria);
            bridgeRouter.post("/keys/_search").handler(apiKeysHandler::search);
            bridgeRouter.get("/apis/:apiId/keys/:key").handler(apiKeysHandler::findByKeyAndApi);

            // Subscriptions handler
            SubscriptionsHandler subscriptionsHandler = new SubscriptionsHandler(bridgeWorkerExecutor);
            applicationContext.getAutowireCapableBeanFactory().autowireBean(subscriptionsHandler);
            bridgeRouter.post("/subscriptions/_search").handler(subscriptionsHandler::search);
            bridgeRouter.post("/subscriptions/_findByIds").handler(subscriptionsHandler::findByIds);

            // Events handler
            EventsHandler eventsHandler = new EventsHandler(bridgeWorkerExecutor);
            applicationContext.getAutowireCapableBeanFactory().autowireBean(eventsHandler);
            bridgeRouter.post("/events/_search").handler(eventsHandler::search);
            bridgeRouter.post("/events/_searchLatest").handler(eventsHandler::searchLatest);
            bridgeRouter.post("/events").handler(eventsHandler::create);
            bridgeRouter.post("/events/_createOrPatch").handler(eventsHandler::createOrPatch);
            bridgeRouter.put("/events/:eventId").handler(eventsHandler::update);
            bridgeRouter.get("/events/:eventId").handler(eventsHandler::findById);

            // Dictionaries handler
            DictionariesHandler dictionariesHandler = new DictionariesHandler(bridgeWorkerExecutor);
            applicationContext.getAutowireCapableBeanFactory().autowireBean(dictionariesHandler);
            bridgeRouter.get("/dictionaries").handler(dictionariesHandler::find);

            // Node Monitoring handler
            NodeMonitoringHandler nodeMonitoringHandler = new NodeMonitoringHandler(bridgeWorkerExecutor);
            applicationContext.getAutowireCapableBeanFactory().autowireBean(nodeMonitoringHandler);
            bridgeRouter.post("/node/monitoring").handler(nodeMonitoringHandler::create);
            bridgeRouter.put("/node/monitoring").handler(nodeMonitoringHandler::update);
            bridgeRouter.get("/node/monitoring").handler(nodeMonitoringHandler::findByNodeIdAndType);

            // Environments handler
            EnvironmentsHandler environmentsHandler = new EnvironmentsHandler(bridgeWorkerExecutor);
            applicationContext.getAutowireCapableBeanFactory().autowireBean(environmentsHandler);
            bridgeRouter.get("/environments").handler(environmentsHandler::findAll);
            bridgeRouter.get("/environments/_byOrganizationId").handler(environmentsHandler::findByOrganizationId);
            bridgeRouter.get("/environments/_byOrganizationsAndHrids").handler(environmentsHandler::findByOrganizationsAndHrids);
            bridgeRouter.get("/environments/:environmentId").handler(environmentsHandler::findById);

            // Organizations handler
            OrganizationsHandler organizationsHandler = new OrganizationsHandler(bridgeWorkerExecutor);
            applicationContext.getAutowireCapableBeanFactory().autowireBean(organizationsHandler);
            bridgeRouter.get("/organizations").handler(organizationsHandler::findAll);
            bridgeRouter.get("/organizations/_byHrids").handler(organizationsHandler::findByHrids);
            bridgeRouter.get("/organizations/:organizationId").handler(organizationsHandler::findById);

            // Installation handler
            InstallationHandler installationHandler = new InstallationHandler(bridgeWorkerExecutor);
            applicationContext.getAutowireCapableBeanFactory().autowireBean(installationHandler);
            bridgeRouter.get("/installation").handler(installationHandler::find);
        }
    }

    private void configureMapper() {
        DatabindCodec
            .prettyMapper()
            .enable(JsonGenerator.Feature.IGNORE_UNKNOWN)
            .disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
    }

    @Override
    protected void doStop() throws Exception {
        super.doStop();

        bridgeWorkerExecutor.close(event -> LOGGER.debug("WorkerExecutor for bridge has been closed"));
        httpServer.close(event -> LOGGER.info("HTTP server for bridge has been stopped"));
    }

    @Override
    protected String name() {
        return "Gateway - Repository Bridge HTTP Server";
    }
}
