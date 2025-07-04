import { useState } from 'react';
import type ClickButtonProps from '../../../props/ClickButtonProps';
import buttonStyles from '../../../scss/common/buttons.module.scss'
import defaultStyles from '../../../scss/common/default.module.scss'

const ClickButton = ({children, delay = 325, onClick = () => {}}: ClickButtonProps) => {
    const [buttonPressed, setPressed] = useState(false)

    const buttonClick = () => {
        setPressed(true)
        setTimeout(() => {
            setPressed(false)
            onClick()
        }, delay)
    }
    
    return (
        <button 
            className={`${defaultStyles['default-styles']} ${buttonPressed ? buttonStyles['focus-button'] : ''}`} 
            onClick={buttonClick}
        >
            {children}
        </button>
    )
}

export default ClickButton