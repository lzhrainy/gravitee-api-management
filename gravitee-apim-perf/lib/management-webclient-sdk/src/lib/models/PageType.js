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
export var PageType;
(function (PageType) {
    PageType["ASCIIDOC"] = "ASCIIDOC";
    PageType["ASYNCAPI"] = "ASYNCAPI";
    PageType["MARKDOWN"] = "MARKDOWN";
    PageType["MARKDOWNTEMPLATE"] = "MARKDOWN_TEMPLATE";
    PageType["SWAGGER"] = "SWAGGER";
    PageType["FOLDER"] = "FOLDER";
    PageType["LINK"] = "LINK";
    PageType["ROOT"] = "ROOT";
    PageType["SYSTEMFOLDER"] = "SYSTEM_FOLDER";
    PageType["TRANSLATION"] = "TRANSLATION";
})(PageType || (PageType = {}));
export function PageTypeFromJSON(json) {
    return PageTypeFromJSONTyped(json, false);
}
export function PageTypeFromJSONTyped(json, ignoreDiscriminator) {
    return json;
}
export function PageTypeToJSON(value) {
    return value;
}