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
import { InstanceStateFromJSON, InstanceStateToJSON, PluginEntityFromJSON, PluginEntityToJSON, } from './';
export function InstanceEntityFromJSON(json) {
    return InstanceEntityFromJSONTyped(json, false);
}
export function InstanceEntityFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'environments': !exists(json, 'environments') ? undefined : json['environments'],
        'environments_hrids': !exists(json, 'environments_hrids') ? undefined : json['environments_hrids'],
        'event': !exists(json, 'event') ? undefined : json['event'],
        'hostname': !exists(json, 'hostname') ? undefined : json['hostname'],
        'id': !exists(json, 'id') ? undefined : json['id'],
        'ip': !exists(json, 'ip') ? undefined : json['ip'],
        'last_heartbeat_at': !exists(json, 'last_heartbeat_at') ? undefined : (new Date(json['last_heartbeat_at'])),
        'organizations_hrids': !exists(json, 'organizations_hrids') ? undefined : json['organizations_hrids'],
        'plugins': !exists(json, 'plugins') ? undefined : (json['plugins'].map(PluginEntityFromJSON)),
        'port': !exists(json, 'port') ? undefined : json['port'],
        'started_at': !exists(json, 'started_at') ? undefined : (new Date(json['started_at'])),
        'state': !exists(json, 'state') ? undefined : InstanceStateFromJSON(json['state']),
        'stopped_at': !exists(json, 'stopped_at') ? undefined : (new Date(json['stopped_at'])),
        'systemProperties': !exists(json, 'systemProperties') ? undefined : json['systemProperties'],
        'tags': !exists(json, 'tags') ? undefined : json['tags'],
        'tenant': !exists(json, 'tenant') ? undefined : json['tenant'],
        'version': !exists(json, 'version') ? undefined : json['version'],
    };
}
export function InstanceEntityToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'environments': value.environments,
        'environments_hrids': value.environments_hrids,
        'event': value.event,
        'hostname': value.hostname,
        'id': value.id,
        'ip': value.ip,
        'last_heartbeat_at': value.last_heartbeat_at === undefined ? undefined : (value.last_heartbeat_at.toISOString()),
        'organizations_hrids': value.organizations_hrids,
        'plugins': value.plugins === undefined ? undefined : (value.plugins.map(PluginEntityToJSON)),
        'port': value.port,
        'started_at': value.started_at === undefined ? undefined : (value.started_at.toISOString()),
        'state': InstanceStateToJSON(value.state),
        'stopped_at': value.stopped_at === undefined ? undefined : (value.stopped_at.toISOString()),
        'systemProperties': value.systemProperties,
        'tags': value.tags,
        'tenant': value.tenant,
        'version': value.version,
    };
}