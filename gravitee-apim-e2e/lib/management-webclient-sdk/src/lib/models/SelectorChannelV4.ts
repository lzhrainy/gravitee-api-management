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
import {
    Selector,
    SelectorFromJSON,
    SelectorFromJSONTyped,
    SelectorToJSON,
    SelectorChannelV4AllOf,
    SelectorChannelV4AllOfFromJSON,
    SelectorChannelV4AllOfFromJSONTyped,
    SelectorChannelV4AllOfToJSON,
} from './';

/**
 * 
 * @export
 * @interface SelectorChannelV4
 */
export interface SelectorChannelV4 extends Selector {
    /**
     * 
     * @type {Array<string>}
     * @memberof SelectorChannelV4
     */
    operations?: Array<SelectorChannelV4OperationsEnum>;
    /**
     * 
     * @type {string}
     * @memberof SelectorChannelV4
     */
    channel: string;
    /**
     * 
     * @type {string}
     * @memberof SelectorChannelV4
     */
    channelOperator: SelectorChannelV4ChannelOperatorEnum;
}

export function SelectorChannelV4FromJSON(json: any): SelectorChannelV4 {
    return SelectorChannelV4FromJSONTyped(json, false);
}

export function SelectorChannelV4FromJSONTyped(json: any, ignoreDiscriminator: boolean): SelectorChannelV4 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        ...SelectorFromJSONTyped(json, ignoreDiscriminator),
        'operations': !exists(json, 'operations') ? undefined : json['operations'],
        'channel': json['channel'],
        'channelOperator': json['channelOperator'],
    };
}

export function SelectorChannelV4ToJSON(value?: SelectorChannelV4 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        ...SelectorToJSON(value),
        'operations': value.operations,
        'channel': value.channel,
        'channelOperator': value.channelOperator,
    };
}

/**
* @export
* @enum {string}
*/
export enum SelectorChannelV4OperationsEnum {
    SUB = 'SUB',
    PUB = 'PUB'
}
/**
* @export
* @enum {string}
*/
export enum SelectorChannelV4ChannelOperatorEnum {
    STARTSWITH = 'STARTS_WITH',
    EQUALS = 'EQUALS'
}

