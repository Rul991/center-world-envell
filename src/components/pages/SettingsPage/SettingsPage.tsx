import ClickButton from '../../buttons/ClickButton';
import TogglePage from '../TogglePage';
import ToggleSwitch from '../../sub-components/ToggleSwitch';
import NumberRange from '../../sub-components/NumberRange'
import WebSocketManager from '../../../utils/WebSocketManager'
import type { ClientSettings, SchemaObject, SettingListProps, SettingRangeProps, Settings, SettingsComponentValue, SettingValue } from '../../../utils/types'
import { useEffect, useState } from 'react'
import StringInput from '../../sub-components/StringInput'
import StringListInput from '../../sub-components/StringListInput'
import SettingsParser from '../../../utils/SettingsParser'
import ObjectValidator from '../../../utils/ObjectValidator'
import styles from './SettingsPage.module.scss'
import defaultStyles from '../../../scss/common/default.module.scss'

type SaveResult = {
    ok: boolean
    reason?: string
}

const SettingsPage = () => {
    const [settings, setRawSettings] = useState<Settings>({})
    const [clientSettings, setClientSettings] = useState<ClientSettings>({})

    const setSettings = (setting: Settings) => {
        setRawSettings(setting)
        setClientSettings(SettingsParser.toClientSettings(setting))
    }

    const updateSettings = (key: string, value: SettingsComponentValue) => {
        setClientSettings({...clientSettings, [key]: value})
    }

    const saveClick = () => {
        WebSocketManager.send('saveSettings', clientSettings)
    }

    useEffect(() => {
        WebSocketManager.on<Settings>('getSettings', data => {
            let isError = false

            if(ObjectValidator.isObject(data)) {
                for(const title in data) {
                    if(isError) break

                    if(!ObjectValidator.isObject(data[title])) {
                        isError = true
                    }
                }
            }
            else isError = true

            if(!isError) setSettings(data)
            else setRawSettings(SettingsParser.getError('Parsing Error'))
        })

        WebSocketManager.on<SaveResult>('saveSettings', data => {
            const schema: SchemaObject<SaveResult> = {
                type: 'object',
                required: ['ok'],
                properties: {
                    ok: {
                        type: 'boolean'
                    },
                    reason: {
                        type: 'string',
                        nullable: true
                    }
                }
            }
            const isValidated = ObjectValidator.isValidatedObject(data, schema)

            const {
                ok,
                reason
            }: SaveResult = {
                ok: isValidated ? data.ok : false,
                reason: isValidated ? 
                    data.reason : 
                    ObjectValidator.getWrongSchemaMessage()
            }

            if(ok) {
                alert('Настройки успешно сохранены!')
            }
            else {
                alert(`Не удалось сохранить настройки!\nПричина: ${reason}`)
            }
        })

        return () => {
            WebSocketManager.off('getSettings')
            WebSocketManager.off('saveSettings')
        }
    }, [])

    const getElements = (sectionValue: Record<string, SettingValue>) => {
        try {
            return Object.entries(sectionValue).map(([key, {type, name, props, value}], j) => {
                const onChange = (value: SettingsComponentValue) => updateSettings(key, value)

                switch (type) {
                    case 'list':
                        if(props === undefined) return <></>

                        if(!(props instanceof Array)) return <></>
                        return <StringListInput onChoose={onChange} key={j} choosedValue={value.toString()} values={props as SettingListProps} title={name}></StringListInput>

                    case 'toggle':
                        return <ToggleSwitch onToggle={onChange} key={j} startValue={value as boolean} title={name}></ToggleSwitch>

                    case 'range':
                        let newProps = props as SettingRangeProps

                        if(newProps === undefined) return <></>
                        if(newProps.max === newProps.min === undefined) return <></>

                        return <NumberRange onChange={onChange} key={j} value={value as number} max={newProps.max} min={newProps.min} title={name}></NumberRange>

                    case 'string':
                        return <StringInput onChange={onChange} key={j} value={value as string} title={name}></StringInput>
                
                    default:
                        return <></>
                }
            })
        }
        catch(e) {
            return [<></>]
        }
    }

    return (
        <TogglePage pageId={2}>
            <div className={defaultStyles.page}>
                <div>
                    <ClickButton onClick={saveClick}>Сохранить изменения</ClickButton>
                    <br />
                </div>
                <div>
                    {
                        Object.entries(settings).map(([sectionName, sectionValue], i) => 
                            <div key={i}>
                                <div className={styles['setting-title']}>{sectionName}</div>
                                <div className={styles.toggles}>
                                    {
                                        getElements(sectionValue)
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </TogglePage>
    )
}

export default SettingsPage