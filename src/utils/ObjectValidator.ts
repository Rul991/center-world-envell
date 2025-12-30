import type { AnyRecord, PrimitiveJavascriptTypes, SchemaObject } from './types'

export default class ObjectValidator {
    private static _exampleValues: Record<PrimitiveJavascriptTypes, any> = {
        'string': 'example',
        'number': 42,
        'bigint': 42,
        'boolean': null,
        'symbol': undefined,
        'undefined': undefined,
        'function': undefined,
        'object': {},
        'array': [],
        'any': {}
    }

    static createExampleObject<T extends AnyRecord>(schema: SchemaObject<T>): T {
        const result = {} as T

        for (const key in schema) {
            const value = schema[key]

            if (typeof value === 'string') {
                if (value in this._exampleValues) {
                    result[key as keyof T] = this._exampleValues[value as PrimitiveJavascriptTypes]
                }
            } 
            
            else {
                result[key as keyof T] = this.createExampleObject(value as SchemaObject<any>)
            }
        }

        return result
    }

    static createJsonExampleObject<T extends AnyRecord>(schema: SchemaObject<T>): string {
        return JSON.stringify(this.createExampleObject(schema))
    }

    static getWrongSchemaMessage<T extends AnyRecord>(schema: SchemaObject<T>): string {
        return `Неправильный формат! Правильный формат выглядит так: ${ObjectValidator
                                    .createJsonExampleObject(schema)}`
    }

    static isArray(arr: any): boolean {
        return arr instanceof Array
    }

    static isObject(obj: any): boolean {
        return typeof obj == 'object' && !this.isArray(obj) && obj !== null
    }

    /**
     * Returns null if object validated, and example object unless validated
     * @param obj - checking object
     * @param schema - schema of checking object
     */

    static isValidatedObject<T extends AnyRecord>(obj: T, schema: SchemaObject<T>): boolean {
        for (const key of Object.keys(schema)) {
            const value = schema[key]
            const valueArray = value instanceof Array ? value : [value]

            for (const type of valueArray) {
                let isError = false

                if(type == 'any') {
                    continue
                }
                if(typeof type == typeof obj[key] && typeof type == 'object') {
                    isError = !this.isValidatedObject(obj[key], type)
                }
                else if(type == 'array' && this.isArray(obj[key])) {
                    isError = false
                }
                else if(type != typeof obj[key]) {
                    isError = true
                }
                else if(type == 'object' && obj[key] === null) {
                    isError = true
                }

                if(isError) return false
            }

        }

        return true
    }

    /**
     * Returns null if objects in array validated or example object unless validated
     * @param arr - checking array with object
     * @param schema - schema of checking object
     */

    static isArrayWithObjects<T extends AnyRecord>(arr: any[], schema: SchemaObject<T>): boolean {
        if(!this.isArray(arr)) return false
        if(!arr.length) return true

        for (const object of arr) {
            if(!this.isValidatedObject(object, schema)) return false
        }

        return true
    }
}