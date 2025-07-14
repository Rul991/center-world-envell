import type MessageOptions from '../interfaces/MessageOptions'
import type PlayerOptions from '../interfaces/PlayerOptions'
import type ServerState from '../interfaces/ServerState'
import type { SchemaObject } from './types'

export const messageUndefinedSchema: SchemaObject<MessageOptions> = {
    user: 'undefined',
    msg: 'string'
}

export const messageStringSchema: SchemaObject<MessageOptions> = {
    user: 'string',
    msg: 'string'
}

export const stateSchema: SchemaObject<ServerState> = {
    title: 'string',
    props: 'object'
}

export const playersSchema: SchemaObject<PlayerOptions> = {
    id: 'number',
    className: 'string',
    name: 'string',
    hp: {
        current: 'number',
        max: 'number'
    },
    mana: {
        current: 'number',
        max: 'number'
    }
}