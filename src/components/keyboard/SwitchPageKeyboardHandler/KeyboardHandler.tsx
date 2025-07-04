import { useCallback, useEffect } from 'react'
import { useCurrentPage } from '../../../utils/hooks'

const SwitchPageKeyboardHandler = () => {
    const [currentPage, setCurrentPage] = useCurrentPage()

    const callback = useCallback((e: KeyboardEvent) => {
        e.stopPropagation()

        const {key, altKey} = e

        if(!altKey) return

        if(!Number.isNaN(+key)) {
            const pageId = +key - 1
            setCurrentPage(pageId)
        }
        else if(key == 'PageDown') {
            setCurrentPage(currentPage + 1)
        }
        else if(key == 'PageUp') {
            setCurrentPage(currentPage - 1)
        }
    }, [setCurrentPage])
    
    useEffect(() => {
        document.addEventListener('keyup', callback)

        return () => document.removeEventListener('keyup', callback)
    }, [callback])

    return <div tabIndex={-1}></div>
}

export default SwitchPageKeyboardHandler