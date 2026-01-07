import type ModalWindowProps from '../../../props/ModalWindowProps'
import ClickButton from '../../buttons/ClickButton'
import styles from './ModalWindow.module.scss'
import type { ModalComponent, ModalComponents, ModalComponentType, ModalSchemas } from '../../../interfaces/modal/modal-types'
import { modalComponentsSchema } from '../../../utils/schemas'
import ObjectValidator from '../../../utils/ObjectValidator'
import { useEffect, useState, type JSX } from 'react'
import type ModalResult from '../../../interfaces/modal/ModalResult'
import NumberRange from '../../sub-components/NumberRange'
import StringInput from '../../sub-components/StringInput'
import ToggleSwitch from '../../sub-components/ToggleSwitch'
import StringListInput from '../../sub-components/StringListInput'

type ElementCallbackResult = JSX.Element

type CreateComponentsResult = {
    jsx: JSX.Element[],
    values: Record<string, any>
}

type ElementCallbackProps<K extends ModalComponentType> = {
    key: string | number,
    value: ModalComponents[K]['value'],
    className: string
    onChangeValue: (value: any) => void
    resultValues: CreateComponentsResult['values']
    setResult: (value: ModalResult['result']) => void
}

type ElementCallbacks = {
    [K in ModalComponentType]: (props: ElementCallbackProps<K>) => ElementCallbackResult
}

type ExitButtonProps = {
    cancelCallback: () => void
    title: string
}

const modalSchemas: ModalSchemas = {
    title: {
        type: 'object',
        required: ['text'],
        properties: {
            text: {
                type: 'string'
            }
        }
    },
    text: {
        type: 'object',
        required: ['text'],
        properties: {
            text: {
                type: 'string'
            }
        }
    },
    grid: {
        type: 'object',
        required: ['children', 'columns', 'rows'],
        properties: {
            columns: {
                type: 'string'
            },
            rows: {
                type: 'string'
            },
            children: modalComponentsSchema
        }
    },
    number: {
        type: 'object',
        required: ['title'],
        properties: {
            title: {
                type: 'string'
            },
            min: {
                type: 'number',
                nullable: true
            },
            max: {
                type: 'number',
                nullable: true
            },
            value: {
                type: 'number',
                nullable: true
            }
        }
    },
    string: {
        type: 'object',
        required: ['title'],
        properties: {
            title: {
                type: 'string'
            },
            value: {
                type: 'string',
                nullable: true
            }
        }
    },
    bool: {
        type: 'object',
        required: ['title'],
        properties: {
            title: {
                type: 'string',
            },
            startValue: {
                type: 'boolean',
                nullable: true
            }
        }
    },
    list: {
        type: 'object',
        required: ['title', 'values'],
        properties: {
            title: {
                type: 'string'
            },
            values: {
                type: 'array',
                items: {
                    type: 'string'
                }
            },
            choosedValue: {
                type: 'string',
                nullable: true
            }
        }
    }
}

const elementCallbacks: ElementCallbacks = {
    title: ({
        key,
        value,
        className
    }) => {
        const {
            text
        } = value

        return (
            <h1
                key={key}
                className={className}
            >
                {text}
            </h1>
        )
    },

    text: ({
        key,
        value,
        className
    }) => {
        const {
            text
        } = value

        return (
            <div
                key={key}
                className={className}
            >
                {text}
            </div>
        )
    },

    grid: ({
        key,
        value,
        className,
        resultValues,
        setResult
    }) => {
        const {
            columns,
            rows,
            children
        } = value

        const {
            jsx,
        } = createComponents(children, setResult, resultValues)

        return (
            <div
                key={key}
                className={className}
                style={{
                    gridTemplateColumns: columns,
                    gridTemplateRows: rows
                }}
            >
                {
                    jsx
                }
            </div>
        )
    },

    number: ({
        key,
        value: {
            title,
            min,
            max,
            value
        },
        onChangeValue
    }) => {
        return (
            <NumberRange
                key={key}
                title={title}
                min={min}
                max={max}
                value={value}
                onChange={value => {
                    onChangeValue(value)
                }}
            />
        )
    },

    string: ({
        key,
        value: {
            value,
            title
        },
        onChangeValue
    }) => {
        return (
            <StringInput
                key={key}
                value={value}
                title={title}
                onChange={v => onChangeValue(v)}
            />
        )
    },

    bool: ({
        key,
        value: {
            startValue,
            title
        },
        onChangeValue
    }) => {
        return (
            <ToggleSwitch
                key={key}
                startValue={startValue}
                title={title}
                onToggle={v => onChangeValue(v)}
            />
        )
    },

    list: ({
        key,
        value: {
            choosedValue,
            title,
            values
        },
        onChangeValue
    }) => {
        return (
            <StringListInput
                key={key}
                choosedValue={choosedValue}
                title={title}
                values={values}
                onChoose={v => onChangeValue(v)}
            />
        )
    },
}

const createComponents = (
    components: ModalComponent[],
    setResult: ElementCallbackProps<any>['setResult'],
    resultValues: CreateComponentsResult['values'] = {}
): CreateComponentsResult => {
    const resultJsx: CreateComponentsResult['jsx'] = components.map((
        {
            id,
            type,
            value
        },
        i
    ) => {
        if (!elementCallbacks[type]) {
            return <></>
        }

        if (!ObjectValidator.isValidatedObject(value, modalSchemas[type] as any)) {
            return <></>
        }

        const className = styles[`component-${type}`]

        return elementCallbacks[type]({
            className,
            value: value as any,
            key: i,
            onChangeValue: value => {
                resultValues[id] = value
                setResult({
                    ...resultValues,
                    [id]: value
                })
            },
            resultValues,
            setResult
        })
    })

    return {
        jsx: resultJsx,
        values: resultValues
    }
}

const ExitButton = ({
    cancelCallback,
    title
}: ExitButtonProps) => {
    return (
        <ClickButton
            defaultClassName={styles.exit}
            clickedClassName={styles.exit}
            onClick={cancelCallback}
        >
            {title}
        </ClickButton>
    )
}

const ModalWindow = ({
    config = {
        id: 'modal',
        components: [],
        options: {
            ok: 'Ok',
            cancel: 'Cancel',
            exit: true,
            title: ''
        }
    },
    onCancel = () => { },
    onOk = () => { },
}: ModalWindowProps) => {
    const {
        id,
        components,
        options: {
            ok,
            cancel,
            exit,
            title
        }
    } = config

    const [{ jsx }, setComponents] = useState<CreateComponentsResult>({
        jsx: [],
        values: {}
    })
    const [result, setResult] = useState<ModalResult['result']>({})
    const cancelCallback = () => onCancel(id)
    const okCallback = () => onOk({
        id,
        result
    })

    useEffect(() => {
        setComponents(createComponents(components, setResult))
    }, [components])

    const hasOk = ok.length > 0
    const hasCancel = cancel.length > 0
    const isOnlyOneButton = !(hasOk && hasCancel)

    return (
        <div id={`${id}`} className={styles.container}>
            <div className={styles.window}>
                <div className={styles['title-bar']}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.buttons}>
                        {
                            exit ?
                                <ExitButton
                                    cancelCallback={cancelCallback}
                                    title='x'
                                /> :
                                undefined
                        }
                    </div>
                </div>
                <div className={styles.content}>
                    {
                        jsx
                    }
                </div>
                <div className={isOnlyOneButton ? styles['submit-one'] : styles['submit-two']}>
                    {
                        hasOk ?
                            <ClickButton
                                onClick={okCallback}
                            >{ok}</ClickButton> :
                            undefined
                    }

                    {
                        hasCancel ?
                            <ExitButton
                                cancelCallback={cancelCallback}
                                title={cancel}
                            /> :
                            undefined
                    }
                </div>
            </div>
        </div>
    )
}

export default ModalWindow