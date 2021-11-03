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
package io.gravitee.rest.api.service.cockpit.services;

import static io.gravitee.rest.api.service.cockpit.services.ImportSwaggerDescriptorBuilder.buildForDocumentedApi;
import static io.gravitee.rest.api.service.cockpit.services.ImportSwaggerDescriptorBuilder.buildForMockedApi;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.gravitee.definition.model.DefinitionVersion;
import io.gravitee.rest.api.model.*;
import io.gravitee.rest.api.model.api.*;
import io.gravitee.rest.api.model.documentation.PageQuery;
import io.gravitee.rest.api.service.*;
import io.gravitee.rest.api.service.cockpit.model.DeploymentMode;
import io.gravitee.rest.api.service.common.GraviteeContext;
import io.gravitee.rest.api.service.common.UuidString;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * @author Julien GIOVARESCO (julien.giovaresco at graviteesource.com)
 * @author GraviteeSource Team
 */
@Component
public class ApiServiceCockpitImpl implements ApiServiceCockpit {

    private final Logger logger = LoggerFactory.getLogger(ApiServiceCockpitImpl.class);

    private final ObjectMapper objectMapper;
    private final ApiService apiService;
    private final SwaggerService swaggerService;
    private final PageService pageService;
    private final ApiMetadataService apiMetadataService;
    private final PlanService planService;

    public ApiServiceCockpitImpl(
        ObjectMapper objectMapper,
        ApiService apiService,
        SwaggerService swaggerService,
        PageService pageService,
        ApiMetadataService apiMetadataService,
        PlanService planService
    ) {
        this.objectMapper = objectMapper;
        this.apiService = apiService;
        this.swaggerService = swaggerService;
        this.pageService = pageService;
        this.apiMetadataService = apiMetadataService;
        this.planService = planService;
    }

    @Override
    public ApiEntity createApi(String apiId, String userId, String swaggerDefinition, String environmentId, DeploymentMode mode) {
        GraviteeContext.setCurrentEnvironment(environmentId);

        if (mode == DeploymentMode.API_MOCKED) {
            logger.debug("Create Mocked Api [{}].", apiId);
            return createMockedApi(apiId, userId, swaggerDefinition, environmentId);
        }

        if (mode == DeploymentMode.API_PUBLISHED) {
            logger.debug("Create Published Api [{}].", apiId);
            return createPublishedApi(apiId, userId, swaggerDefinition, environmentId);
        }

        logger.debug("Create Documented Api [{}].", apiId);
        return createDocumentedApi(apiId, userId, swaggerDefinition, environmentId);
    }

    @Override
    public ApiEntity updateApi(String apiId, String userId, String swaggerDefinition, String environmentId, DeploymentMode mode) {
        GraviteeContext.setCurrentEnvironment(environmentId);

        if (mode == DeploymentMode.API_DOCUMENTED) {
            logger.debug("Update Documented Api [{}].", apiId);
            return updateDocumentedApi(apiId, swaggerDefinition);
        }

        if (mode == DeploymentMode.API_MOCKED) {
            logger.debug("Update Mocked Api [{}].", apiId);
            return updateMockedApi(apiId, userId, swaggerDefinition);
        }

        logger.debug("Update Published Api [{}].", apiId);
        return updateMockedApi(apiId, userId, swaggerDefinition);
    }

    private ApiEntity createDocumentedApi(String apiId, String userId, String swaggerDefinition, String environmentId) {
        ImportSwaggerDescriptorEntity swaggerDescriptor = buildForDocumentedApi(swaggerDefinition);
        return createApiEntity(apiId, userId, swaggerDescriptor);
    }

    private ApiEntity updateDocumentedApi(String apiId, String swaggerDefinition) {
        return updateApiEntity(apiId, buildForDocumentedApi(swaggerDefinition));
    }

    private ApiEntity createMockedApi(String apiId, String userId, String swaggerDefinition, String environmentId) {
        ImportSwaggerDescriptorEntity swaggerDescriptor = buildForMockedApi(swaggerDefinition);

        createApiEntity(apiId, userId, swaggerDescriptor);
        this.planService.create(createKeylessPlan(apiId, environmentId));

        return this.apiService.start(apiId, userId);
    }

    private ApiEntity updateMockedApi(String apiId, String userId, String swaggerDefinition) {
        updateApiEntity(apiId, buildForMockedApi(swaggerDefinition));

        ApiDeploymentEntity apiDeployment = new ApiDeploymentEntity();
        apiDeployment.setDeploymentLabel("Model updated");
        return apiService.deploy(apiId, userId, EventType.PUBLISH_API, apiDeployment);
    }

    private ApiEntity createPublishedApi(String apiId, String userId, String swaggerDefinition, String environmentId) {
        ImportSwaggerDescriptorEntity swaggerDescriptor = buildForMockedApi(swaggerDefinition);

        createApiEntity(apiId, userId, swaggerDescriptor);
        this.planService.create(createKeylessPlan(apiId, environmentId));
        ApiEntity apiEntity = this.apiService.start(apiId, userId);

        publishSwaggerDocumentation(apiId);

        UpdateApiEntity updateEntity = ApiService.convert(apiEntity);
        updateEntity.setVisibility(Visibility.PUBLIC);
        updateEntity.setLifecycleState(ApiLifecycleState.PUBLISHED);
        return this.apiService.update(apiId, updateEntity);
    }

    private ApiEntity updateApiEntity(String apiId, ImportSwaggerDescriptorEntity swaggerDescriptor) {
        final SwaggerApiEntity api = swaggerService.createAPI(swaggerDescriptor, DefinitionVersion.V2);
        api.setPaths(null);

        return this.apiService.updateFromSwagger(apiId, api, swaggerDescriptor);
    }

    private ApiEntity createApiEntity(String apiId, String userId, ImportSwaggerDescriptorEntity swaggerDescriptor) {
        final SwaggerApiEntity api = swaggerService.createAPI(swaggerDescriptor, DefinitionVersion.V2);
        api.setPaths(null);

        final ObjectNode apiDefinition = objectMapper.valueToTree(api);
        apiDefinition.put("id", apiId);

        final ApiEntity createdApi = apiService.createWithApiDefinition(api, userId, apiDefinition);
        pageService.createAsideFolder(apiId, GraviteeContext.getCurrentEnvironment());
        pageService.createOrUpdateSwaggerPage(apiId, swaggerDescriptor, true);
        apiMetadataService.create(api.getMetadata(), createdApi.getId());
        return createdApi;
    }

    private NewPlanEntity createKeylessPlan(String apiId, String environmentId) {
        NewPlanEntity plan = new NewPlanEntity();
        plan.setId(UuidString.generateForEnvironment(environmentId, apiId));
        plan.setName("Keyless plan");
        plan.setSecurity(PlanSecurityType.KEY_LESS);
        plan.setApi(apiId);
        plan.setStatus(PlanStatus.PUBLISHED);

        return plan;
    }

    private void publishSwaggerDocumentation(String apiId) {
        List<PageEntity> apiDocs = pageService.search(
            new PageQuery.Builder().api(apiId).type(PageType.SWAGGER).build(),
            GraviteeContext.getCurrentEnvironment()
        );

        if (apiDocs.isEmpty()) {
            // This should not happen since we have created the documentation in previous step
            logger.error("No swagger documentation to publish");
            return;
        }

        if (apiDocs.size() > 1) {
            // This should not happen since we have created the documentation in previous step
            logger.error("More than one swagger documentation, this should not happen");
        }

        PageEntity page = apiDocs.get(0);

        if (!page.isPublished()) {
            UpdatePageEntity updatePage = UpdatePageEntity.from(page);
            updatePage.setPublished(true);
            pageService.update(page.getId(), updatePage);
        }
    }
}