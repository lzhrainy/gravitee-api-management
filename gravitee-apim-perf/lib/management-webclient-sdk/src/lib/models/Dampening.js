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
export function DampeningFromJSON(json) {
    return DampeningFromJSONTyped(json, false);
}
export function DampeningFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'duration': !exists(json, 'duration') ? undefined : json['duration'],
        'mode': json['mode'],
        'timeUnit': !exists(json, 'timeUnit') ? undefined : json['timeUnit'],
        'totalEvaluations': !exists(json, 'totalEvaluations') ? undefined : json['totalEvaluations'],
        'trueEvaluations': !exists(json, 'trueEvaluations') ? undefined : json['trueEvaluations'],
    };
}
export function DampeningToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'duration': value.duration,
        'mode': value.mode,
        'timeUnit': value.timeUnit,
        'totalEvaluations': value.totalEvaluations,
        'trueEvaluations': value.trueEvaluations,
    };
}
/**
* @export
* @enum {string}
*/
export var DampeningModeEnum;
(function (DampeningModeEnum) {
    DampeningModeEnum["STRICTCOUNT"] = "STRICT_COUNT";
    DampeningModeEnum["RELAXEDCOUNT"] = "RELAXED_COUNT";
    DampeningModeEnum["RELAXEDTIME"] = "RELAXED_TIME";
    DampeningModeEnum["STRICTTIME"] = "STRICT_TIME";
})(DampeningModeEnum || (DampeningModeEnum = {}));
/**
* @export
* @enum {string}
*/
export var DampeningTimeUnitEnum;
(function (DampeningTimeUnitEnum) {
    DampeningTimeUnitEnum["NANOSECONDS"] = "NANOSECONDS";
    DampeningTimeUnitEnum["MICROSECONDS"] = "MICROSECONDS";
    DampeningTimeUnitEnum["MILLISECONDS"] = "MILLISECONDS";
    DampeningTimeUnitEnum["SECONDS"] = "SECONDS";
    DampeningTimeUnitEnum["MINUTES"] = "MINUTES";
    DampeningTimeUnitEnum["HOURS"] = "HOURS";
    DampeningTimeUnitEnum["DAYS"] = "DAYS";
})(DampeningTimeUnitEnum || (DampeningTimeUnitEnum = {}));