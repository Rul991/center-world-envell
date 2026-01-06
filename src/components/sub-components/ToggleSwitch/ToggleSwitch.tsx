import type ToggleSwitchProps from '../../../props/ToggleSwitchProps';
import { useToggle } from '../../../utils/hooks'
import styles from './ToggleSwitch.module.scss'

const ToggleSwitch = ({
    onToggle = () => {},
    title,
    startValue = false
}: ToggleSwitchProps) => {
    const [toggled, toggle] = useToggle(startValue)
    const onClick = () => {
        toggle()
        onToggle(!toggled)
    }

    return (
        <div className={styles['switch']}>
            <div className={styles['title']}>
                {title}:
            </div>

            <div className={styles['button']} onClick={onClick}>
                <div className={styles[`button-${toggled ? 'on' : 'off'}`]}></div>
            </div>
        </div>
    )
}

export default ToggleSwitch