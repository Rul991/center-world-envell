import { useEffect, useState } from 'react'
import ToggleButton from '../ToggleButton'
import styles from './ChatToggleButton.module.scss'
import { useCurrentPage, useTotalChatLength } from '../../../utils/hooks'
import WebSocketManager from '../../../utils/WebSocketManager'
import { CHAT_PAGE_ID } from '../../../utils/consts'

const ChatToggleButton = () => {
    const [totalLength, _] = useTotalChatLength()
    const [currentPage] = useCurrentPage()

    const [notReadMessages, setNotReadMessages] = useState(0)
    const [readMessages, setReadMessages] = useState(0)

    const onToggle = () => {
        setReadMessages(totalLength)
    }

    useEffect(() => {
        const isCurrentPageChat = currentPage == CHAT_PAGE_ID

        if (isCurrentPageChat) {
            setReadMessages(totalLength)
        }

        return () => WebSocketManager.off('chatLength')
    }, [totalLength, currentPage, setReadMessages])

    useEffect(() => {
        const min = 0
        const notReadMessages = Math.max(totalLength - readMessages, min)
        setNotReadMessages(notReadMessages)
    }, [readMessages, totalLength])

    return (
        <ToggleButton
            className={notReadMessages > 0 ? styles['new-messages'] : ''}
            onToggle={onToggle}
            title={`Чат ${notReadMessages > 0 ? `(${notReadMessages})` : ''}`}
            id={1}
        ></ToggleButton>
    )
}

export default ChatToggleButton