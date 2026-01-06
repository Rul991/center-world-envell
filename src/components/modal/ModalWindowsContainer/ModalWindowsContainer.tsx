import { useEffect } from 'react'
import _ from './ModalWindowsContainer.module.scss'
import { useModals } from '../../../utils/hooks'
import WebSocketManager from '../../../utils/WebSocketManager'
import type ModalConfig from '../../../interfaces/modal/ModalConfig'
import ModalWindow from '../ModalWindow/ModalWindow'
import type { State } from '../../../utils/types'
import type ModalResult from '../../../interfaces/modal/ModalResult'
import ObjectValidator from '../../../utils/ObjectValidator'
import { modalConfigSchema } from '../../../utils/schemas'

const socketModalName = 'modal'

const createModal = ([modals, setModals]: State<ModalConfig[]>) => {
    const modal = modals[0]

    const deleteFirstModal = () => {
        const [_, ...other] = modals
        setModals(other)
    }

    return modal !== undefined ?
        <ModalWindow
            config={modal}
            onCancel={() => {
                WebSocketManager.send<ModalResult>(
                    socketModalName,
                    {
                        id: modal.id,
                    }
                )

                deleteFirstModal()
            }}
            onOk={result => {
                WebSocketManager.send<ModalResult>(
                    socketModalName,
                    result
                )

                deleteFirstModal()
                console.log(result)
            }}
        /> :
        undefined
}

const ModalWindowsContainer = () => {
    const modalsState = useModals()
    const [modals, setModals] = modalsState

    useEffect(() => {
        WebSocketManager.on<ModalConfig>(socketModalName, config => {
            if (!ObjectValidator.isValidatedObject(config, modalConfigSchema)) return
            setModals([...modals, config])
        })

        return () => WebSocketManager.off(socketModalName)
    }, [modalsState])

    return (
        <>
            {
                createModal(modalsState)
            }
        </>
    )
}

export default ModalWindowsContainer