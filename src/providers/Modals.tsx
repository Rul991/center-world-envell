import {
    createContext,
    type PropsWithChildren,
    useState,
} from 'react'
import type { State } from '../utils/types'
import type ModalConfig from '../interfaces/modal/ModalConfig'

const value: ModalConfig[] = []
export const ModalsContext = createContext<State<ModalConfig[]>>(
    [value, () => value]
)

export const ModalsProvider = ({ children }: PropsWithChildren) => {
    const modalsState = useState(value)

    return (
        <ModalsContext.Provider value={modalsState}>
            {children}
        </ModalsContext.Provider>
    )
}