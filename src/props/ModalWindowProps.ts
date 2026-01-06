import type ModalConfig from '../interfaces/modal/ModalConfig'
import type ModalResult from '../interfaces/modal/ModalResult'

export default interface ModalWindowProps {
    config?: ModalConfig
    onCancel?: (id: string) => void
    onOk?: (config: ModalResult) => void
}