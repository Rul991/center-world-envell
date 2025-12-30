import type MessageOptions from '../interfaces/MessageOptions';

export default interface ChatInputProps {
    onSend?: (data: MessageOptions) => void
}