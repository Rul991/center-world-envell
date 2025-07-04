import {
  useEffect,
  useState,
} from 'react';
import type ServerState from '../../../interfaces/ServerState';
import ServerFetch from '../../../utils/ServerFetch';
import ClickButton from '../../buttons/ClickButton';
import Card from '../../other/Card';
import TogglePage from '../TogglePage';
import { useToggle } from '../../../utils/hooks'

const MainPage = () => {
    const [states, setStates] = useState<ServerState[]>([])
    const [isUpdate, toggleUpdate] = useToggle(false)

    useEffect(() => {
        ServerFetch.post<ServerState[]>({state: {}})
        .then(([states, _]) => {
            if(typeof states == 'string') {
                setStates([{'title': 'Ошибка!', props: {
                    'Ошибка': states
                }}])
            }
            else setStates(states)
        })
        .catch((e: Error) => {
            console.warn(e)
            setStates(
            [
                {
                    title: 'Ошибка!', 
                    props: {
                        'Название': e.name,
                        'Описание': e.message,
                    }
                }
            ])
        })
    }, [isUpdate])

    return (
        <TogglePage pageId={0}>
            <ClickButton onClick={() => toggleUpdate()}>Обновить состояние сервера</ClickButton>
            {states.map((state, i) => <Card key={i} className={i % 2 ? 'right-card': ''} options={state}></Card>)}
        </TogglePage>
    )
}

export default MainPage