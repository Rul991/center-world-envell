import { useEffect, useState } from 'react'
import ChatToggleButton from '../../buttons/ChatToggleButton'
import ToggleButton from '../../buttons/ToggleButton'
import WebSocketManager from '../../../utils/WebSocketManager'
import type { SchemaObject } from '../../../utils/types'
import ObjectValidator from '../../../utils/ObjectValidator'
import ClickButton from '../../buttons/ClickButton'
import styles from './SidePanel.module.scss'
import defaultStyles from '../../../scss/common/default.module.scss'

type JsonButton = {
    id: string
    title: string
}
type JsonButtons = JsonButton[]

const jsonButtonsSchema: SchemaObject<JsonButtons> = {
    type: 'array',
    items: {
        type: 'object',
        required: ['id', 'title'],
        properties: {
            id: {
                type: 'string'
            },
            title: {
                type: 'string'
            }
        }
    }
}

const SidePanel = () => {
    const startButtons: JsonButtons = []

    const [buttons, setButtons] = useState<JsonButtons>(startButtons)

    useEffect(() => {
        WebSocketManager.on<JsonButtons>('buttons', data => {
            if (!ObjectValidator.isValidatedObject(data, jsonButtonsSchema)) return

            setButtons(data)
        })

        return () => WebSocketManager.off('buttons')
    }, [setButtons, buttons])

    return <div className='padding-panel'>
        <div className={defaultStyles.page}>
            <div>
                <ToggleButton title='Главное' id={0}></ToggleButton>
                <ChatToggleButton />
                <ToggleButton title='Настройки' id={2}></ToggleButton>
            </div>
            <div className={styles.scroll}>
                {
                    buttons.map(({ id, title }) => {
                        return (
                            <ClickButton
                                key={id}
                                onClick={() => {
                                    WebSocketManager.send<string>('clickButton', id)
                                }}
                            >
                                {title}
                            </ClickButton>
                        )
                    })
                }
            </div>
        </div>
    </div>
}

export default SidePanel