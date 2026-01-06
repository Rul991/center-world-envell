import type ModalWindowProps from '../../../props/ModalWindowProps'
import ClickButton from '../../buttons/ClickButton'
import styles from './ModalWindow.module.scss'

const ModalWindow = ({
    config = {
        id: 'modal',
        components: [],
        options: {
            ok: 'Ok',
            cancel: 'Cancel',
            exit: true,
            title: 'Modal Window'
        }
    }
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
    
    return (
        <div className={styles.container}>
            <div className={styles.window}>
                <div className={styles['title-bar']}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.buttons}>
                        {
                            exit ?
                                <ClickButton
                                    defaultClassName={styles.exit}
                                    clickedClassName={styles.exit}
                                >
                                    x
                                </ClickButton> :
                                undefined
                        }
                    </div>
                </div>
                <div className={styles.content}>

                </div>
            </div>
        </div>
    )
}

export default ModalWindow