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
import { KeyStoreFromJSON, KeyStoreToJSON, TrustStoreFromJSON, TrustStoreToJSON, } from './';
export function HttpClientSslOptionsFromJSON(json) {
    return HttpClientSslOptionsFromJSONTyped(json, false);
}
export function HttpClientSslOptionsFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'hostnameVerifier': !exists(json, 'hostnameVerifier') ? undefined : json['hostnameVerifier'],
        'keyStore': !exists(json, 'keyStore') ? undefined : KeyStoreFromJSON(json['keyStore']),
        'trustAll': !exists(json, 'trustAll') ? undefined : json['trustAll'],
        'trustStore': !exists(json, 'trustStore') ? undefined : TrustStoreFromJSON(json['trustStore']),
    };
}
export function HttpClientSslOptionsToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'hostnameVerifier': value.hostnameVerifier,
        'keyStore': KeyStoreToJSON(value.keyStore),
        'trustAll': value.trustAll,
        'trustStore': TrustStoreToJSON(value.trustStore),
    };
}