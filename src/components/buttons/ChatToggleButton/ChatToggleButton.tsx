import { useState } from 'react'
import ToggleButton from '../ToggleButton'
import styles from './ChatToggleButton.module.scss'
import { useCurrentPage, useTotalChatLength, useUpdateInterval } from '../../../utils/hooks'
import ServerFetch from '../../../utils/ServerFetch'
import { CHAT_PAGE_ID } from '../../../utils/consts'

const ChatToggleButton = () => {
    const [totalLength, _] = useTotalChatLength()
    const [currentPage] = useCurrentPage()
    const [length, setLength] = useState(0)
    const [notReadMessages, setNotReadMessages] = useState(0)

    const onToggle = () => {
        setLength(0)
    }

    useUpdateInterval(() => {
        if(currentPage == CHAT_PAGE_ID) return

        ServerFetch.post<number>({chatLength: {}})
        .then(([result, _]) => {
            if(typeof result == 'number') {
                const newMessagesLength = Math.max(result - totalLength, 0)

                setLength(newMessagesLength)

                Notification?.requestPermission()
                .then(permission => {
                    if(permission == 'granted' && newMessagesLength > 0 && newMessagesLength != notReadMessages) {
                        new Notification(`Новые сообщения: ${newMessagesLength}`, {
                            'icon': 'images/logo.png'
                        })
                        setNotReadMessages(newMessagesLength)
                    }
                })
            }
            else {
                console.error(`Server Error: ${result}`)
            }
        })
        .catch((e: Error) => {
            console.error(e)
        }) 
    }, [totalLength, length, currentPage, notReadMessages])

    return <ToggleButton className={length > 0 ? styles['new-messages'] : ''} onToggle={onToggle} title={`Чат ${length > 0 ? `(${length})` : ''}`} id={1}></ToggleButton>
}

export default ChatToggleButton