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
import { ApiFromJSON, ApiToJSON, ApplicationFromJSON, ApplicationToJSON, PlanFromJSON, PlanToJSON, SubscriptionStatusFromJSON, SubscriptionStatusToJSON, UserFromJSON, UserToJSON, } from './';
export function SubscriptionFromJSON(json) {
    return SubscriptionFromJSONTyped(json, false);
}
export function SubscriptionFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'api': !exists(json, 'api') ? undefined : ApiFromJSON(json['api']),
        'application': !exists(json, 'application') ? undefined : ApplicationFromJSON(json['application']),
        'client_id': !exists(json, 'client_id') ? undefined : json['client_id'],
        'closed_at': !exists(json, 'closed_at') ? undefined : (new Date(json['closed_at'])),
        'created_at': !exists(json, 'created_at') ? undefined : (new Date(json['created_at'])),
        'ending_at': !exists(json, 'ending_at') ? undefined : (new Date(json['ending_at'])),
        'id': !exists(json, 'id') ? undefined : json['id'],
        'paused_at': !exists(json, 'paused_at') ? undefined : (new Date(json['paused_at'])),
        'plan': !exists(json, 'plan') ? undefined : PlanFromJSON(json['plan']),
        'processed_at': !exists(json, 'processed_at') ? undefined : (new Date(json['processed_at'])),
        'processed_by': !exists(json, 'processed_by') ? undefined : json['processed_by'],
        'reason': !exists(json, 'reason') ? undefined : json['reason'],
        'request': !exists(json, 'request') ? undefined : json['request'],
        'starting_at': !exists(json, 'starting_at') ? undefined : (new Date(json['starting_at'])),
        'status': !exists(json, 'status') ? undefined : SubscriptionStatusFromJSON(json['status']),
        'subscribed_by': !exists(json, 'subscribed_by') ? undefined : UserFromJSON(json['subscribed_by']),
        'updated_at': !exists(json, 'updated_at') ? undefined : (new Date(json['updated_at'])),
    };
}
export function SubscriptionToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'api': ApiToJSON(value.api),
        'application': ApplicationToJSON(value.application),
        'client_id': value.client_id,
        'closed_at': value.closed_at === undefined ? undefined : (value.closed_at.toISOString()),
        'created_at': value.created_at === undefined ? undefined : (value.created_at.toISOString()),
        'ending_at': value.ending_at === undefined ? undefined : (value.ending_at.toISOString()),
        'id': value.id,
        'paused_at': value.paused_at === undefined ? undefined : (value.paused_at.toISOString()),
        'plan': PlanToJSON(value.plan),
        'processed_at': value.processed_at === undefined ? undefined : (value.processed_at.toISOString()),
        'processed_by': value.processed_by,
        'reason': value.reason,
        'request': value.request,
        'starting_at': value.starting_at === undefined ? undefined : (value.starting_at.toISOString()),
        'status': SubscriptionStatusToJSON(value.status),
        'subscribed_by': UserToJSON(value.subscribed_by),
        'updated_at': value.updated_at === undefined ? undefined : (value.updated_at.toISOString()),
    };
}