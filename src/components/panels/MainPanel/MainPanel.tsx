import ChatPage from '../../pages/ChatPage';
import MainPage from '../../pages/MainPage';
import SettingsPage from '../../pages/SettingsPage';
import styles from './MainPanel.module.scss'
import panelStyles from '../../../scss/common/panels.module.scss'

const MainPanel = () => {
    return <div className={`${panelStyles['padding-panel']} ${styles['main-panel']}`}>
        <MainPage />
        <ChatPage />
        <SettingsPage />
    </div>
}

export default MainPanel