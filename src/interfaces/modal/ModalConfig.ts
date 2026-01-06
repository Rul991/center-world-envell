import type ModalComponent from './ModalComponent'
import type ModalOptions from './ModalOptions'

export default interface ModalConfig {
    id: string
    components: ModalComponent[]
    options: ModalOptions
}