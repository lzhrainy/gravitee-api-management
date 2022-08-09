/* tslint:disable */
/* eslint-disable */
/**
 * Gravitee.io - Management API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
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
 * @interface ApplicationMembership
 */
export interface ApplicationMembership {
    /**
     * User's technical identifier.
     * @type {string}
     * @memberof ApplicationMembership
     */
    id?: string;
    /**
     * User's reference for user providing from an identity provider.
     * @type {string}
     * @memberof ApplicationMembership
     */
    reference?: string;
    /**
     * Role's name
     * @type {string}
     * @memberof ApplicationMembership
     */
    role: string;
}

export function ApplicationMembershipFromJSON(json: any): ApplicationMembership {
    return ApplicationMembershipFromJSONTyped(json, false);
}

export function ApplicationMembershipFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApplicationMembership {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'reference': !exists(json, 'reference') ? undefined : json['reference'],
        'role': json['role'],
    };
}

export function ApplicationMembershipToJSON(value?: ApplicationMembership | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'reference': value.reference,
        'role': value.role,
    };
}

