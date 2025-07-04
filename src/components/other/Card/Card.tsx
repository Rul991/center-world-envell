import type CardProps from '../../../props/CardProps';
import { useToggle } from '../../../utils/hooks'
import styles from './Card.module.scss'
import defaultStyles from '../../../scss/common/default.module.scss'

const Card = ({options: {title, props}, className = ''}: CardProps) => {
    const [isShow, toggleShow] = useToggle(false)

    return (
        <div className={`${defaultStyles['default-styles']} ${styles.card} ${className}`} onClick={() => toggleShow()}>
            <div className={`${styles['card-title']} ${isShow ? styles['underline-title'] : ''}`}>{title}</div>
            {
                isShow && 
                Object.entries(props).map(([key, value], i) => 
                    <div key={i} className={styles['card-prop']}>
                        <span className={styles['card-prop-name']}>{key}: </span>
                        <span className={styles['card-prop-value']}>{value}</span>
                    </div>
                )
            }
        </div>
    )
}

export default Card