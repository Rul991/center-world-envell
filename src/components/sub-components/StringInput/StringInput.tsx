import { useEffect, useState, type ChangeEvent } from 'react'
import type StringInputProps from '../../../props/StringInputProps'
import styles from './StringInput.module.scss'

const StringInput = ({title, value = '', onChange = () => {}}: StringInputProps) => {
    const [text, setText] = useState(value)
    const usedTitle = title + ':'

    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setText(value)
    }

    useEffect(() => {
        onChange(text.trim())
    }, [text])

    return (
        <div className={styles['string-input']}>
            <div className={styles.title}>{usedTitle}</div>
            <input onChange={inputChange} type='text' placeholder={usedTitle} value={text} className={styles['input']} />
        </div>
    )
}

export default StringInput