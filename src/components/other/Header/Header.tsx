import { useEffect, useState } from 'react'
import styles from './Header.module.scss'
import { MORGART_CHANCE } from '../../../utils/consts'

const Header = () => {
    const [chance] = useState(Math.random())
    const [logo, setLogo] = useState('images/logo.png')

    const resetCache = () => {
        sessionStorage.removeItem('messages')
        sessionStorage.removeItem('page-id')
        sessionStorage.removeItem('total-length')
        
        alert('Кэш очищен! Перезагружаю страницу...')
        location.reload()
    }

    useEffect(() => {
        const isMorgart = chance < MORGART_CHANCE

        if(isMorgart) {
            const href = `images/morgart.png`
            const logoLink = document.querySelector('#logo') as HTMLLinkElement

            if(logoLink) {
                logoLink.href = href
            }

            document.title = 'Менять правила все таки можно!'
            setLogo(href)
        }
    }, [])

    return <header className={styles.header}>
        <img src={logo} alt="logo" />
        <span onDoubleClick={resetCache}>Центр мира</span>
    </header>
}

export default Header