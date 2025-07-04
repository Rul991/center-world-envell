import styles from './Header.module.scss'

const Header = () => {
    return <header className={styles.header}>
        <img src="images/logo.png" alt="" />
        <span>Центр мира</span>
    </header>
}

export default Header