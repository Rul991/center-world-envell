import type TogglePageProps from '../../../props/TogglePageProps';
import { useCurrentPage } from '../../../utils/hooks'

const TogglePage = ({children, pageId: id}: TogglePageProps) => {
    const [currentPage, _] = useCurrentPage()

    return (
        <div
            style={{display: id != currentPage ? 'none' : 'block', height: '100%'}}
            >
            {children}
        </div>
    )
}

export default TogglePage