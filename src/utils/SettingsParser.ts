import type { ClientSettings, Settings } from './types'

export default class SettingsParser {
    static toClientSettings(settings: Settings): ClientSettings {
        let clientSettings: ClientSettings = {}

        Object.entries(settings).forEach(([_, value]) => 
            Object.entries(value).forEach(([key, {value}]) => {
                clientSettings[key] = value
            })
        )

        return clientSettings
    }

    static getError(value: string): Settings {
        return {'Ошибка': {'error': {name: value, type: 'toggle', value: true}}}
    }
}