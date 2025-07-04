import {
  useEffect,
  useState,
} from 'react';
import type PlayerOptions from '../../../interfaces/PlayerOptions';
import PlayerGenerator from '../../../utils/PlayerOptionsGenerator';
import ServerFetch from '../../../utils/ServerFetch';
import ClickButton from '../../buttons/ClickButton/ClickButton';
import PlayerComponent from '../../other/PlayerComponent';

const PlayerPanel = () => {
    const [update, setUpdate] = useState(false)
    const [players, setPlayers] = useState<PlayerOptions[]>([])

    const updatePlayers = () => {
        setUpdate(!update)
    }

    useEffect(() => {
        let statusCode = 500
        ServerFetch.post<PlayerOptions[]>({players: {}})
        .then(([value, status]) => {
            statusCode = status

            if(typeof value == 'string') {
                setPlayers([PlayerGenerator.error(status, value)])
            }
            else if(value.length) {
                setPlayers([PlayerGenerator.cool('Все ок', status), ...value])
            }
            else {
                setPlayers([PlayerGenerator.empty()])
            }
        })
        .catch(e => {
            console.warn(e)
            setPlayers([PlayerGenerator.error(statusCode)])
        })
    }, [update])

    return <div className='padding-panel'>
        <ClickButton onClick={updatePlayers}>Обновить игроков</ClickButton>
        <div className='players-list'>
            {players.map((player, i) => <PlayerComponent key={i} options={player} />)}
        </div>
    </div>
}

export default PlayerPanel