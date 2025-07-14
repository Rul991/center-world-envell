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
import ObjectValidator from '../../../utils/ObjectValidator'
import { stateSchema } from '../../../utils/schemas'

const MainPage = () => {
    const [states, setStates] = useState<ServerState[]>([])
    const [isUpdate, toggleUpdate] = useToggle(false)

    useEffect(() => {
        const errorStates: ServerState[] = [
            {
                title: 'Ошибка!', 
                props: {
                    'Ошибка': ObjectValidator.getWrongSchemaMessage(stateSchema)
                }
            }
        ]

        ServerFetch.post<ServerState[]>({state: {}})
        .then(([states, _]) => {

            if(typeof states == 'string') {
                errorStates[0].props['Ошибка'] = states
                setStates(errorStates)
            }
            else {
                if(ObjectValidator.isArrayWithObjects(states, stateSchema))
                    setStates(states)
                else setStates(errorStates)
            }
        })
        .catch((e: Error) => {
            console.warn(e)
            errorStates[0].props = {
                'Название': e.name,
                'Описание': e.message,
            }
            setStates(errorStates)
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