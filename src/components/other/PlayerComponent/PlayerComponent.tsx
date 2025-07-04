import type PlayerOptions from '../../../interfaces/PlayerOptions';
import { useToggle } from '../../../utils/hooks'
import styles from './PlayerComponent.module.scss'
import defaultStyles from '../../../scss/common/default.module.scss'

const PlayerComponent = ({options: {mana, hp, name, id, className}}: {options: PlayerOptions}) => {
    const [isShowFull, toggleShowFull] = useToggle(false)

    return <div className={`${styles.player} ${defaultStyles['default-styles']}`} onClick={() => toggleShowFull()}>
        <div className={`${styles.id}`}>P{id}</div>
        <div>
            <span className={`${styles.name}`}>{name}<span className={`${styles.classname}`}> ( {className} )</span></span>
            {isShowFull && 
                <div>
                    <div className={`${styles.mana}`}>Мана: {mana.current} / {mana.max}</div>
                    <div className={`${styles.hp}`}>ХП: {hp.current} / {hp.max}</div>
                </div>
            }
        </div>
    </div>
}

export default PlayerComponent