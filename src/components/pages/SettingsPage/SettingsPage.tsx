import ClickButton from '../../buttons/ClickButton';
import TogglePage from '../TogglePage';
import ToggleSwitch from '../../setting-components/ToggleSwitch';
import NumberRange from '../../setting-components/NumberRange'
import ServerFetch from '../../../utils/ServerFetch'
import type { ClientSettings, SettingListProps, SettingRangeProps, Settings, SettingsComponentValue, SettingValue } from '../../../utils/types'
import { useEffect, useState } from 'react'
import StringInput from '../../setting-components/StringInput'
import StringListInput from '../../setting-components/StringListInput'
import SettingsParser from '../../../utils/SettingsParser'
import { useToggle } from '../../../utils/hooks'
import ObjectValidator from '../../../utils/ObjectValidator'
import styles from './SettingsPage.module.scss'
import defaultStyles from '../../../scss/common/default.module.scss'

const SettingsPage = () => {
    const [settings, setRawSettings] = useState<Settings>({})
    const [clientSettings, setClientSettings] = useState<ClientSettings>({})
    const [update, toggleUpdate] = useToggle(false)

    const setSettings = (setting: Settings) => {
        setRawSettings(setting)
        setClientSettings(SettingsParser.toClientSettings(setting))
    }

    const updateSettings = (key: string, value: SettingsComponentValue) => {
        setClientSettings({...clientSettings, [key]: value})
    }

    const saveClick = () => {
        ServerFetch.post<{}>({saveSettings: clientSettings})
        .then(() => alert('Сохранено! Настройки обновятся после перезапуска сервера!'))
        .catch(e => {
            console.error(e)
            alert('Не удалось сохранить настройки :(')
        })
    }

    const updateClick = () => {
        toggleUpdate()
    }

    useEffect(() => {
        ServerFetch.post<Settings>({getSettings: {}})
        .then(([value, _]) => {
            if(typeof value == 'string') {
                setRawSettings(SettingsParser.getError(value))
            }
            else {
                let isError = false

                if(ObjectValidator.isObject(value)) {
                    for(const title in value) {
                        if(isError) break

                        if(!ObjectValidator.isObject(value[title])) {
                            isError = true
                        }
                    }
                }
                else isError = true

                if(!isError) setSettings(value)
                else setRawSettings(SettingsParser.getError('Parsing Error'))
            }
        })
        .catch((e: Error) => {
            setRawSettings(SettingsParser.getError(e.message))
        })
    }, [update])

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
                    <ClickButton onClick={updateClick}>Обновить настройки с сервера</ClickButton>
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