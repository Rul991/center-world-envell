import type MessageOptions from '../interfaces/MessageOptions'
import type PlayerOptions from '../interfaces/PlayerOptions'
import type ServerState from '../interfaces/ServerState'
import type { SchemaObject, WebSocketMessage } from './types'

export const messagesSchema: SchemaObject<MessageOptions[]> = {
    type: 'array',
    items: {
        type: 'object',
        required: ['msg'],
        properties: {
            msg: {
                type: 'string'
            },
            user: {
                type: 'string',
                nullable: true
            }
        }
    }
}

export const statesSchema: SchemaObject<ServerState[]> = {
    type: 'array',
    items: {
        type: 'object',
        required: ['props', 'title'],
        properties: {
            title: {
                type: 'string'
            },
            props: {
                type: 'object',
                required: []
            }
        }
    }
}

export const playersSchema: SchemaObject<PlayerOptions[]> = {
    type: 'array',
    items: {
        type: 'object',
        required: ['id', 'className', 'name', 'hp', 'mana'],
        properties: {
            id: {
                type: 'number'
            },
            className: {
                type: 'string'
            },
            name: {
                type: 'string'
            },
            hp: {
                type: 'object',
                required: ['current', 'max'],
                properties: {
                    current: {
                        type: 'number'
                    },
                    max: {
                        type: 'number'
                    }
                }
            },
            mana: {
                type: 'object',
                required: ['current', 'max'],
                properties: {
                    current: {
                        type: 'number'
                    },
                    max: {
                        type: 'number'
                    }
                }
            }
        }
    }
}

//@ts-ignore
export const webSocketMessageSchema: SchemaObject<WebSocketMessage<any>> = {
    type: 'object',
    required: ['type'],
    properties: {
        type: {
            type: 'string'
        },
        data: {
            type: ['object', 'string', 'number', 'array', 'boolean', 'integer'],
            nullable: true,
            anyOf: [
                {
                    type: 'string'
                },
                {
                    type: 'boolean'
                },
                {
                    type: 'number'
                },
                {
                    type: 'object'
                },
                {
                    type: 'array'
                }
            ]
        }
    }
}