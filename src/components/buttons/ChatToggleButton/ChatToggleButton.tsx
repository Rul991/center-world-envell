import { useEffect, useState } from 'react'
import ToggleButton from '../ToggleButton'
import styles from './ChatToggleButton.module.scss'
import { useCurrentPage, useTotalChatLength } from '../../../utils/hooks'
import WebSocketManager from '../../../utils/WebSocketManager'
import { CHAT_PAGE_ID } from '../../../utils/consts'

const ChatToggleButton = () => {
    const [totalLength, _] = useTotalChatLength()
    const [currentPage] = useCurrentPage()
    const [length, setLength] = useState(0)
    const [notReadMessages, setNotReadMessages] = useState(0)

    const onToggle = () => {
        setLength(0)
    }

    useEffect(() => {
        WebSocketManager.on<number>('chatLength', result => {
            if (typeof result == 'number') {
                const newMessagesLength = Math.max(result - totalLength, 0)
                setLength(newMessagesLength)
                if(currentPage == CHAT_PAGE_ID) {
                    setNotReadMessages(0)
                    return
                }

                if (newMessagesLength > 0 && newMessagesLength != notReadMessages) {
                    setNotReadMessages(newMessagesLength)
                    Notification?.requestPermission()
                        .then(permission => {
                            if (permission == 'granted') {
                                new Notification(`Новые сообщения: ${newMessagesLength}`, {
                                    'icon': 'images/logo.png'
                                })
                            }
                        })
                }
            }
            else {
                console.error(`Server Error: ${result}`)
            }
        })
    }, [totalLength, length, currentPage, notReadMessages])

    return (
        <ToggleButton
            className={length > 0 ? styles['new-messages'] : ''}
            onToggle={onToggle}
            title={`Чат ${length > 0 ? `(${length})` : ''}`}
            id={1}
        ></ToggleButton>
    )
}

export default ChatToggleButton