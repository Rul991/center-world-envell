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

const PlayerPanel = () => {
    const [players, setPlayers] = useState<PlayerOptions[]>([])

    useEffect(() => {
        WebSocketManager.on<PlayerOptions[]>('players', value => {
            if(value.length) {
                if(ObjectValidator.isArrayWithObjects(value, playersSchema)) {
                    setPlayers([PlayerGenerator.cool('Все ок', 200), ...value])
                }
                else {
                    setPlayers([PlayerGenerator.error(
                        500, 
                        ObjectValidator.getWrongSchemaMessage(playersSchema))
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
            {players.map((player, i) => <PlayerComponent key={i} options={player} />)}
        </div>
    </div>
}

export default PlayerPanel