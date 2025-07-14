import type {
  Dispatch,
  SetStateAction,
} from 'react';

export type State<T> = [T, Dispatch<SetStateAction<T>>]
export type SettingsWithType<Value> = Record<string, Record<string, Value>>

export type SettingsComponentType = 'toggle' | 'range' | 'string' | 'list'
export type SettingsComponentValue = string | number | boolean

// settings value sended to server

export type ClientSettings = Record<string, SettingsComponentValue>
export type ClientSettingsValue = {type: SettingsComponentType, value: SettingsComponentValue}

// settings props

export type Settings = SettingsWithType<SettingValue>
export type SettingValue = ClientSettingsValue & {name: string, props?: SettingProps}

export type SettingListProps = string[]
export type SettingRangeProps = {min: number, max: number}
export type SettingProps = SettingRangeProps | SettingListProps

// unions

export type PrimitiveJavascriptTypes = 
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'undefined'
  | 'function'
  | 'object'
  | 'array'

export type ArrayJavascriptTypes = `${PrimitiveJavascriptTypes}[]`

export type ObjectJavascriptTypes = Record<string, PrimitiveJavascriptTypes | Record<string, PrimitiveJavascriptTypes>>

export type JavascriptTypes = PrimitiveJavascriptTypes | ObjectJavascriptTypes

// shorthands

export type AnyRecord = Record<string, any>
export type SchemaObject<T extends AnyRecord> = Record<keyof T, JavascriptTypes>