import {
  useEffect,
  type FC,
} from 'react';
import type ToggleButtonProps from '../../../props/ToggleButtonProps';
import { useCurrentPage } from '../../../utils/hooks'
import defaultStyles from '../../../scss/common/default.module.scss'
import styles from './ToggleButton.module.scss'

const ToggleButton: FC<ToggleButtonProps> = ({title, id, className = '', onToggle = () => {}}) => {
    const [currentPage, setCurrentPage] = useCurrentPage()

    const buttonClick = () => {
      setCurrentPage(id)
    }

    useEffect(() => {
      if(currentPage == id) {
        onToggle()
      }
    }, [currentPage])

    return <button 
      onClick={buttonClick}
      className={`${defaultStyles['default-styles']} ${currentPage == id ? styles['choosed-button'] : ''} ${className}`}
    >
        {title}
    </button>
}

export default ToggleButton