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
/**
 *
 * @export
 * @enum {string}
 */
export var Format;
(function (Format) {
    Format["WSDL"] = "WSDL";
    Format["API"] = "API";
})(Format || (Format = {}));
export function FormatFromJSON(json) {
    return FormatFromJSONTyped(json, false);
}
export function FormatFromJSONTyped(json, ignoreDiscriminator) {
    return json;
}
export function FormatToJSON(value) {
    return value;
}