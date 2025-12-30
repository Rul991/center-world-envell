import {
  useEffect,
  useState,
} from 'react';
import type ServerState from '../../../interfaces/ServerState'
import WebSocketManager from '../../../utils/WebSocketManager'
import Card from '../../other/Card';
import TogglePage from '../TogglePage';
import ObjectValidator from '../../../utils/ObjectValidator'
import { stateSchema } from '../../../utils/schemas'
import defaultStyles from '../../../scss/common/default.module.scss'

const MainPage = () => {
    const [states, setStates] = useState<ServerState[]>([])

    useEffect(() => {
        const errorStates: ServerState[] = [
            {
                title: 'Ошибка!', 
                props: {
                    'Ошибка': ObjectValidator.getWrongSchemaMessage(stateSchema)
                }
            }
        ]

        WebSocketManager.on<ServerState[]>('state', data => {
            if(ObjectValidator.isArrayWithObjects(data, stateSchema))
                setStates(data)
            else setStates(errorStates)
        })

        return () => WebSocketManager.off('state')
    }, [])

    return (
        <TogglePage pageId={0}>
            <div className={defaultStyles.page}>
                <div>
                    {
                        states.map((state, i) => 
                            <Card key={i} className={i % 2 ? 'right-card': ''} options={state}></Card>)
                    }
                </div>
            </div>
        </TogglePage>
    )
}

export default MainPage