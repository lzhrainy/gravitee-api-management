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
import { NotificationConfigTypeFromJSON, NotificationConfigTypeToJSON, } from './';
export function GenericNotificationConfigEntityFromJSON(json) {
    return GenericNotificationConfigEntityFromJSONTyped(json, false);
}
export function GenericNotificationConfigEntityFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'config': !exists(json, 'config') ? undefined : json['config'],
        'config_type': !exists(json, 'config_type') ? undefined : NotificationConfigTypeFromJSON(json['config_type']),
        'hooks': !exists(json, 'hooks') ? undefined : json['hooks'],
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'notifier': !exists(json, 'notifier') ? undefined : json['notifier'],
        'referenceId': !exists(json, 'referenceId') ? undefined : json['referenceId'],
        'referenceType': !exists(json, 'referenceType') ? undefined : json['referenceType'],
        'useSystemProxy': !exists(json, 'useSystemProxy') ? undefined : json['useSystemProxy'],
    };
}
export function GenericNotificationConfigEntityToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'config': value.config,
        'config_type': NotificationConfigTypeToJSON(value.config_type),
        'hooks': value.hooks,
        'id': value.id,
        'name': value.name,
        'notifier': value.notifier,
        'referenceId': value.referenceId,
        'referenceType': value.referenceType,
        'useSystemProxy': value.useSystemProxy,
    };
}