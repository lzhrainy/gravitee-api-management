/* tslint:disable */
/* eslint-disable */
/**
 * Gravitee.io Portal Rest API
 * API dedicated to the devportal part of Gravitee
 *
 * Contact: contact@graviteesource.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    User,
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
} from './';

/**
 * 
 * @export
 * @interface Member
 */
export interface Member {
    /**
     * Unique identifier of a member (user).
     * @type {string}
     * @memberof Member
     */
    id?: string;
    /**
     * 
     * @type {User}
     * @memberof Member
     */
    user?: User;
    /**
     * Creation date and time of the member.
     * @type {Date}
     * @memberof Member
     */
    created_at?: Date;
    /**
     * Last update date and time of the member.
     * @type {Date}
     * @memberof Member
     */
    updated_at?: Date;
    /**
     * Role of the member. (OWNER, USER, ...).
     * @type {string}
     * @memberof Member
     */
    role?: string;
}

export function MemberFromJSON(json: any): Member {
    return MemberFromJSONTyped(json, false);
}

export function MemberFromJSONTyped(json: any, ignoreDiscriminator: boolean): Member {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'user': !exists(json, 'user') ? undefined : UserFromJSON(json['user']),
        'created_at': !exists(json, 'created_at') ? undefined : (new Date(json['created_at'])),
        'updated_at': !exists(json, 'updated_at') ? undefined : (new Date(json['updated_at'])),
        'role': !exists(json, 'role') ? undefined : json['role'],
    };
}

export function MemberToJSON(value?: Member | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'user': UserToJSON(value.user),
        'created_at': value.created_at === undefined ? undefined : (value.created_at.toISOString()),
        'updated_at': value.updated_at === undefined ? undefined : (value.updated_at.toISOString()),
        'role': value.role,
    };
}

