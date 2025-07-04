import {
    useState,
} from 'react';
import type MessageOptions from '../../../interfaces/MessageOptions';
import ServerFetch from '../../../utils/ServerFetch';
import ChatInput from '../../other/ChatInput';
import TogglePage from '../TogglePage';
import { useCurrentPage, useTotalChatLength, useUpdateInterval } from '../../../utils/hooks'
import Message from '../../other/Message'
import styles from './ChatPage.module.scss'
import { CHAT_PAGE_ID } from '../../../utils/consts'

const ChatPage = () => {
    let parsed: MessageOptions[] = []

    try {
        parsed = JSON.parse(sessionStorage.getItem('messages') || '[]')
    }

    catch(e) {
        console.error('Parsed error: ', e)
    }

    const [messages, setMessages] = useState<MessageOptions[]>(parsed)
    const [currentPage] = useCurrentPage()
    const [totalLength, setTotalLength] = useTotalChatLength()

    const addMessages = (newMessages: MessageOptions[]) => {
        const messagesArray = [...newMessages, ...messages]
        setMessages(messagesArray)
        sessionStorage.setItem('messages', JSON.stringify(messagesArray))
    }

    const onSend = (promise: Promise<[MessageOptions | string, number]>) => {
        promise
        .then(([result, _]) => {
            if(typeof result == 'string') {
                const message: MessageOptions = {user: 'Ошибка с сервера', msg: result}
                addMessages([message])
            }

            else {
                addMessages([result])
            }
        })
        .catch((e: Error) => {
            const message: MessageOptions = {user: 'Ошибка', msg: e.message}
            addMessages([message])
        })
    }

    useUpdateInterval(() => {
        if(currentPage != CHAT_PAGE_ID) return

        ServerFetch.post<MessageOptions[]>({getChat: {messagesLength: totalLength}})
        .then(([result, _]) => {
            if(typeof result == 'string') {
                const message: MessageOptions = {user: 'Ошибка с сервера', msg: result}
                addMessages([message])
            }
            else {
                addMessages(result)
                setTotalLength(totalLength + result.length)
            }
        })
        .catch((e: Error) => {
            console.error(e)
        })
    }, [currentPage, totalLength])

    return (
        <TogglePage pageId={CHAT_PAGE_ID}>
            <div>
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