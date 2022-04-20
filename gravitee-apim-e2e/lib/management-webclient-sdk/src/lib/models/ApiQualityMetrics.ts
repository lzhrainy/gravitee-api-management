/* tslint:disable */
/* eslint-disable */
/**
 * Gravitee.io - Management API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 3.18.0-SNAPSHOT
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ApiQualityMetrics
 */
export interface ApiQualityMetrics {
    /**
     * 
     * @type {boolean}
     * @memberof ApiQualityMetrics
     */
    enabled?: boolean;
    /**
     * 
     * @type {number}
     * @memberof ApiQualityMetrics
     */
    functionalDocumentationWeight?: number;
    /**
     * 
     * @type {number}
     * @memberof ApiQualityMetrics
     */
    technicalDocumentationWeight?: number;
    /**
     * 
     * @type {number}
     * @memberof ApiQualityMetrics
     */
    descriptionWeight?: number;
    /**
     * 
     * @type {number}
     * @memberof ApiQualityMetrics
     */
    descriptionMinLength?: number;
    /**
     * 
     * @type {number}
     * @memberof ApiQualityMetrics
     */
    logoWeight?: number;
    /**
     * 
     * @type {number}
     * @memberof ApiQualityMetrics
     */
    categoriesWeight?: number;
    /**
     * 
     * @type {number}
     * @memberof ApiQualityMetrics
     */
    labelsWeight?: number;
    /**
     * 
     * @type {number}
     * @memberof ApiQualityMetrics
     */
    healthcheckWeight?: number;
}

export function ApiQualityMetricsFromJSON(json: any): ApiQualityMetrics {
    return ApiQualityMetricsFromJSONTyped(json, false);
}

export function ApiQualityMetricsFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiQualityMetrics {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'enabled': !exists(json, 'enabled') ? undefined : json['enabled'],
        'functionalDocumentationWeight': !exists(json, 'functionalDocumentationWeight') ? undefined : json['functionalDocumentationWeight'],
        'technicalDocumentationWeight': !exists(json, 'technicalDocumentationWeight') ? undefined : json['technicalDocumentationWeight'],
        'descriptionWeight': !exists(json, 'descriptionWeight') ? undefined : json['descriptionWeight'],
        'descriptionMinLength': !exists(json, 'descriptionMinLength') ? undefined : json['descriptionMinLength'],
        'logoWeight': !exists(json, 'logoWeight') ? undefined : json['logoWeight'],
        'categoriesWeight': !exists(json, 'categoriesWeight') ? undefined : json['categoriesWeight'],
        'labelsWeight': !exists(json, 'labelsWeight') ? undefined : json['labelsWeight'],
        'healthcheckWeight': !exists(json, 'healthcheckWeight') ? undefined : json['healthcheckWeight'],
    };
}

export function ApiQualityMetricsToJSON(value?: ApiQualityMetrics | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'enabled': value.enabled,
        'functionalDocumentationWeight': value.functionalDocumentationWeight,
        'technicalDocumentationWeight': value.technicalDocumentationWeight,
        'descriptionWeight': value.descriptionWeight,
        'descriptionMinLength': value.descriptionMinLength,
        'logoWeight': value.logoWeight,
        'categoriesWeight': value.categoriesWeight,
        'labelsWeight': value.labelsWeight,
        'healthcheckWeight': value.healthcheckWeight,
    };
}

