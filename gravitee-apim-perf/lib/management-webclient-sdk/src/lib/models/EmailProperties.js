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
import { exists } from '../runtime';
export function EmailPropertiesFromJSON(json) {
    return EmailPropertiesFromJSONTyped(json, false);
}
export function EmailPropertiesFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'auth': !exists(json, 'auth') ? undefined : json['auth'],
        'sslTrust': !exists(json, 'sslTrust') ? undefined : json['sslTrust'],
        'startTlsEnable': !exists(json, 'startTlsEnable') ? undefined : json['startTlsEnable'],
    };
}
export function EmailPropertiesToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'auth': value.auth,
        'sslTrust': value.sslTrust,
        'startTlsEnable': value.startTlsEnable,
    };
}