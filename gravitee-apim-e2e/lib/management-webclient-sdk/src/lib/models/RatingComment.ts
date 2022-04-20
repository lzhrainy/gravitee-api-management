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
 * @interface RatingComment
 */
export interface RatingComment {
    /**
     * 
     * @type {boolean}
     * @memberof RatingComment
     */
    mandatory?: boolean;
}

export function RatingCommentFromJSON(json: any): RatingComment {
    return RatingCommentFromJSONTyped(json, false);
}

export function RatingCommentFromJSONTyped(json: any, ignoreDiscriminator: boolean): RatingComment {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'mandatory': !exists(json, 'mandatory') ? undefined : json['mandatory'],
    };
}

export function RatingCommentToJSON(value?: RatingComment | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'mandatory': value.mandatory,
    };
}

