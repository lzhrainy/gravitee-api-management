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
 * @interface UpdateUserEntity
 */
export interface UpdateUserEntity {
    /**
     * 
     * @type {string}
     * @memberof UpdateUserEntity
     */
    firstname?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateUserEntity
     */
    lastname?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateUserEntity
     */
    email?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateUserEntity
     */
    picture?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateUserEntity
     */
    status?: string;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateUserEntity
     */
    newsletter?: boolean;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof UpdateUserEntity
     */
    customFields?: { [key: string]: any; };
}

export function UpdateUserEntityFromJSON(json: any): UpdateUserEntity {
    return UpdateUserEntityFromJSONTyped(json, false);
}

export function UpdateUserEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateUserEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'firstname': !exists(json, 'firstname') ? undefined : json['firstname'],
        'lastname': !exists(json, 'lastname') ? undefined : json['lastname'],
        'email': !exists(json, 'email') ? undefined : json['email'],
        'picture': !exists(json, 'picture') ? undefined : json['picture'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'newsletter': !exists(json, 'newsletter') ? undefined : json['newsletter'],
        'customFields': !exists(json, 'customFields') ? undefined : json['customFields'],
    };
}

export function UpdateUserEntityToJSON(value?: UpdateUserEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'firstname': value.firstname,
        'lastname': value.lastname,
        'email': value.email,
        'picture': value.picture,
        'status': value.status,
        'newsletter': value.newsletter,
        'customFields': value.customFields,
    };
}

