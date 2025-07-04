import type MessageOptions from '../interfaces/MessageOptions';

export default interface ChatInputProps {
    onSend?: (resp: Promise<[MessageOptions | string, number]>) => void
}