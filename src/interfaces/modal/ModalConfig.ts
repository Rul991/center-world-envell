import type { ModalComponent } from './modal-types'
import type ModalOptions from './ModalOptions'

export default interface ModalConfig {
    id: string
    components: ModalComponent[]
    options: ModalOptions
}