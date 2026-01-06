import { useEffect, useState, type ChangeEvent } from 'react'
import type NumberRangeProps from '../../../props/NumberRangeProps'
import styles from './NumberRange.module.scss'

const NumberRange = ({min = 0, max = 100, value = 0, onChange = _ => {}, title}: NumberRangeProps) => {
    const [currentValue, setValue] = useState(value)

    useEffect(() => {
        let newValue = currentValue

        if(value > max) newValue = max
        else if(value < min) newValue = min

        setValue(newValue)
    }, [])

    useEffect(() => {
        onChange(currentValue)
    }, [currentValue])

    const getValue = () => {
        return isNaN(currentValue) ? min : currentValue
    }

    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.valueAsNumber
        setValue(value)
    }

    const inputBlur = () => {
        const newValue = Math.min(max, Math.max(min, getValue()))
        setValue(newValue)
        onChange(newValue)
    }

    return (
        <div className={styles['number-range']}>
            <div className={styles.title}>{title}:</div>
            <input onBlur={inputBlur} onChange={inputChange} className={styles.range} type='range' min={min} max={max} value={getValue()} />
            <input onBlur={inputBlur} onChange={inputChange} type='number' className={styles.number} min={min} max={max} value={currentValue} />
        </div>
    )
}

export default NumberRange