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