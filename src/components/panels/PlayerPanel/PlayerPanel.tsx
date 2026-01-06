import {
  useEffect,
  useState,
} from 'react';
import type PlayerOptions from '../../../interfaces/PlayerOptions';
import PlayerGenerator from '../../../utils/PlayerOptionsGenerator';
import WebSocketManager from '../../../utils/WebSocketManager';
import PlayerComponent from '../../other/PlayerComponent';
import ObjectValidator from '../../../utils/ObjectValidator'
import { playersSchema } from '../../../utils/schemas'
import styles from './PlayerPanel.module.scss'
import PlayerOptionsGenerator from '../../../utils/PlayerOptionsGenerator'

const PlayerPanel = () => {
    const [players, setPlayers] = useState<PlayerOptions[]>([])

    useEffect(() => {
        WebSocketManager.on<PlayerOptions[]>('players', value => {
            if(value.length) {
                if(ObjectValidator.isValidatedObject(value, playersSchema)) {
                    setPlayers([PlayerGenerator.cool('Все ок', 200), ...value])
                }
                else {
                    setPlayers([PlayerGenerator.error(
                        500, 
                        ObjectValidator.getWrongSchemaMessage())
                    ])
                }
            }
            else {
                setPlayers([PlayerGenerator.empty()])
            }
        })

        return () => WebSocketManager.off('players')
    }, [])

    return <div className={`padding-panel ${styles.panel}`}>
        <div className={`players-list`}>
            {
                players.length <= 0 ? 
                    <PlayerComponent options={PlayerOptionsGenerator.empty()} /> :
                    undefined
            }
            {players.map((player, i) => <PlayerComponent key={i} options={player} />)}
        </div>
    </div>
}

export default PlayerPanel