import ObjectValidator from './ObjectValidator'
import type { ClientSettings, Settings } from './types'

export default class SettingsParser {
    static toClientSettings(settings: Settings): ClientSettings {
        let clientSettings: ClientSettings = {}

        if(ObjectValidator.isObject(settings)) 
            Object.entries(settings).forEach(([_, value]) => {
                if(!ObjectValidator.isObject(settings)) return
                Object.entries(value).forEach(([key, { value }]) => {
                    if(!(typeof value == 'boolean' || typeof value == 'number' || typeof value == 'string')) return
                    clientSettings[key] = value
                })
            }
        )

        return clientSettings
    }

    static getError(value: string): Settings {
        return {'Ошибка': {'error': {name: value, type: 'toggle', value: true}}}
    }
}