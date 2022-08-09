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
/**
 * 
 * @export
 * @interface FormDataContentDisposition
 */
export interface FormDataContentDisposition {
    /**
     * 
     * @type {Date}
     * @memberof FormDataContentDisposition
     */
    creationDate?: Date;
    /**
     * 
     * @type {string}
     * @memberof FormDataContentDisposition
     */
    fileName?: string;
    /**
     * 
     * @type {Date}
     * @memberof FormDataContentDisposition
     */
    modificationDate?: Date;
    /**
     * 
     * @type {string}
     * @memberof FormDataContentDisposition
     */
    name?: string;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof FormDataContentDisposition
     */
    parameters?: { [key: string]: string; };
    /**
     * 
     * @type {Date}
     * @memberof FormDataContentDisposition
     */
    readDate?: Date;
    /**
     * 
     * @type {number}
     * @memberof FormDataContentDisposition
     */
    size?: number;
    /**
     * 
     * @type {string}
     * @memberof FormDataContentDisposition
     */
    type?: string;
}

export function FormDataContentDispositionFromJSON(json: any): FormDataContentDisposition {
    return FormDataContentDispositionFromJSONTyped(json, false);
}

export function FormDataContentDispositionFromJSONTyped(json: any, ignoreDiscriminator: boolean): FormDataContentDisposition {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'creationDate': !exists(json, 'creationDate') ? undefined : (new Date(json['creationDate'])),
        'fileName': !exists(json, 'fileName') ? undefined : json['fileName'],
        'modificationDate': !exists(json, 'modificationDate') ? undefined : (new Date(json['modificationDate'])),
        'name': !exists(json, 'name') ? undefined : json['name'],
        'parameters': !exists(json, 'parameters') ? undefined : json['parameters'],
        'readDate': !exists(json, 'readDate') ? undefined : (new Date(json['readDate'])),
        'size': !exists(json, 'size') ? undefined : json['size'],
        'type': !exists(json, 'type') ? undefined : json['type'],
    };
}

export function FormDataContentDispositionToJSON(value?: FormDataContentDisposition | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'creationDate': value.creationDate === undefined ? undefined : (value.creationDate.toISOString()),
        'fileName': value.fileName,
        'modificationDate': value.modificationDate === undefined ? undefined : (value.modificationDate.toISOString()),
        'name': value.name,
        'parameters': value.parameters,
        'readDate': value.readDate === undefined ? undefined : (value.readDate.toISOString()),
        'size': value.size,
        'type': value.type,
    };
}

