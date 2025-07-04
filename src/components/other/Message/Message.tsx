import styles from './Message.module.scss'
import defaultStyle from '../../../scss/common/default.module.scss'
import type MessageProps from '../../../props/MessageProps'

const Message = ({user, msg}: MessageProps) => {
    return <div className={`${styles['message']} ${defaultStyle['default-styles']}`}>
        <div className={styles['message-user']}>{user}:</div>
        <hr />
        <div className={styles['message-message']}>{msg}</div>
    </div>
}

export default Message