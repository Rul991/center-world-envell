import Ajv from 'ajv'
import type { SchemaObject } from './types'

export default class ObjectValidator {
    private static _ajv = new Ajv({
        allErrors: true,
        allowUnionTypes: true
    })

    static getWrongSchemaMessage(): string {
        return `Неправильный формат!`
    }

    static isValidatedObject<T>(obj: any, schema: SchemaObject<T>): obj is T {
        const validator = this._ajv.compile<T>(schema)
        const isValid = validator(obj)

        validator.errors?.forEach(error => {
            console.error('[Validation Error]', error)
        })

        return isValid
    }

    static isObject(value: any): boolean {
        return typeof value == 'object'
    }
}