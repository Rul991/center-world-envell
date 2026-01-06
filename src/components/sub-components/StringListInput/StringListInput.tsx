import { type ChangeEvent } from 'react'
import type StringListProps from '../../../props/StringListProps'
import styles from './StringListInput.module.scss'

const StringListInput = ({title, choosedValue, values, onChoose = () => {}}: StringListProps) => {
    const selectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        onChoose(value)
    }

    return (
        <div className={styles['string-list']}>
            <div className={styles.title}>{title}:</div>
            <select className={styles.select} onChange={selectChange} defaultValue={choosedValue ?? values[0] ?? ''}>
            {
                values.map((text, i) => 
                    <option className={styles.option} key={i} value={text}>{text}</option>
                )
            }
            </select>
        </div>
    )
}

export default StringListInput