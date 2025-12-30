import {
  type ChangeEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import type MessageOptions from '../../../interfaces/MessageOptions';
import type ChatInputProps from '../../../props/ChatInputProps';
import WebSocketManager from '../../../utils/WebSocketManager';
import ClickButton from '../../buttons/ClickButton';
import defaultStyles from '../../../scss/common/default.module.scss'
import styles from './ChatInput.module.scss'

const ChatInput = ({onSend = () => {}}: ChatInputProps) => {
    const [text, setText] = useState('')
    
    const input = useRef<null | HTMLInputElement>(null)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        
        setText(value)
    }
    
    const sendMessage = () => {
        const trimmedValue = text.trim()
        
        if(trimmedValue.length) {
            WebSocketManager.send<MessageOptions>('newMessage', {msg: trimmedValue})
            setText('')
        }
    }

    useEffect(() => {
        WebSocketManager.on<MessageOptions>('newMessage', data => {
            onSend(data)
        })

        return () => WebSocketManager.off('newMessage')
    }, [])

    useEffect(() => {
        if(!input.current) return

        const callback = (e: KeyboardEvent) => {
            if(e.key == 'Enter' && document.activeElement == input.current) {
                sendMessage()
            }
        }

        document.addEventListener('keyup', callback)

        return () => document.removeEventListener('keyup', callback)
    }, [input, sendMessage])

    return (
        <div className={styles['chat-input']}>
            <input ref={input} className={`${defaultStyles['default-styles']} ${styles['chat-input-input']}`} onChange={onChange} type="text" value={text}/>
            <div className={styles['chat-input-button']}>
                <ClickButton onClick={sendMessage}>Отправить</ClickButton>
            </div>
        </div>
    )
}

export default ChatInput