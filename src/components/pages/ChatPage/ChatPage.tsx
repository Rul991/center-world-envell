import {
    useEffect,
    useState,
} from 'react';
import type MessageOptions from '../../../interfaces/MessageOptions';
import WebSocketManager from '../../../utils/WebSocketManager';
import ChatInput from '../../other/ChatInput';
import TogglePage from '../TogglePage';
import { useTotalChatLength } from '../../../utils/hooks'
import Message from '../../other/Message'
import { CHAT_PAGE_ID } from '../../../utils/consts'
import ObjectValidator from '../../../utils/ObjectValidator'
import { messageStringSchema, messageUndefinedSchema } from '../../../utils/schemas'
import styles from './ChatPage.module.scss'
import defaultStyles from '../../../scss/common/default.module.scss'

const ChatPage = () => {
    let parsed: MessageOptions[] = []

    try {
        parsed = JSON.parse(sessionStorage.getItem('messages') || '[]')
    }

    catch(e) {
        console.error('Parsed error: ', e)
    }

    const [messages, setMessages] = useState<MessageOptions[]>(parsed)
    const [totalLength, setTotalLength] = useTotalChatLength()

    const addMessages = (newMessages: MessageOptions[]) => {
        const messagesArray = [...newMessages, ...messages]
        setMessages(messagesArray)
        sessionStorage.setItem('messages', JSON.stringify(messagesArray))
    }

    const onSend = (data: MessageOptions) => {
        const getMessageWithoutNickname = (text: any): string => {
            if(typeof text == 'string') {
                const result = text.split(':')
                return result[1]?.trim() ?? '???'
            }
            else return text ?? '???'
        }

        console.log(data)
        data.msg = getMessageWithoutNickname(data.msg)
        addMessages([data])
    }

    useEffect(() => {
        WebSocketManager.send('chatMessages', {messagesLength: totalLength})
    }, [])

    useEffect(() => {
        WebSocketManager.on<MessageOptions[]>('chatMessages', result => {
            const errorMessage: MessageOptions = {
                user: 'Ошибка с сервера', 
                msg: ObjectValidator.getWrongSchemaMessage(messageStringSchema)
            }

            if(ObjectValidator.isArrayWithObjects(result, messageStringSchema) || 
                ObjectValidator.isArrayWithObjects(result, messageUndefinedSchema)) {
                    addMessages(result)
                    setTotalLength(totalLength + result.length)
            }
            else addMessages([errorMessage])
        })

        return () => WebSocketManager.off('chatMessages')
    }, [totalLength])

    return (
        <TogglePage pageId={CHAT_PAGE_ID}>
            <div className={defaultStyles.page}>
                <ChatInput onSend={onSend} />
                <div className={styles.messages}>
                    {
                        messages.map(({user, msg}, i) => 
                            <Message key={i} user={user ?? 'WebClient'} msg={msg} />
                        )
                    }
                </div>
            </div>
        </TogglePage>
    )
}

export default ChatPage