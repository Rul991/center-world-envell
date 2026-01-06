import type NumberRangeProps from '../../props/NumberRangeProps'
import type StringInputProps from '../../props/StringInputProps'
import type StringListProps from '../../props/StringListProps'
import type ToggleSwitchProps from '../../props/ToggleSwitchProps'
import type { SchemaObject } from '../../utils/types'

export type ModalComponentBase = {
    id: string
}

export type ModalComponents = {
    [K in ModalComponentType]: ModalComponentBase & {
        type: K
        value: ModalComponentValues[K]
    }
}

export type ModalComponent = ModalComponents[ModalComponentType]

export type ModalComponentType = 'title' | 'text' | 'grid' | 'number' | 'string' | 'bool' | 'list'
export type ModalComponentValues = {
    title: {
        text: string
    }
    text: {
        text: string
    }
    grid: {
        columns: string
        rows: string
        children: ModalComponent[]
    }
    number: Omit<NumberRangeProps, 'onChange'>
    string: Omit<StringInputProps, 'onChange'>
    bool: Omit<ToggleSwitchProps, 'onToggle'>
    list: Omit<StringListProps, 'onChoose'>
}

export type ModalSchemas = {
    [K in ModalComponentType]: SchemaObject<ModalComponentValues[K]>
}