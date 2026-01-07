import './scss/index.scss'
import Header from './components/other/Header'
import MainPanel from './components/panels/MainPanel'
import PlayerPanel from './components/panels/PlayerPanel'
import SidePanel from './components/panels/SidePanel'
import { CurrentPageProvider } from './providers/CurrentPage'
import KeyboardHandler from './components/keyboard/SwitchPageKeyboardHandler'
import { TotalChatLengthProvider } from './providers/TotalChatLength'
import { ModalsProvider } from './providers/Modals'
import ModalWindowsContainer from './components/modal/ModalWindowsContainer'

const App = () => {
    return <>
        <ModalsProvider>
            <ModalWindowsContainer />
            <Header />
            <CurrentPageProvider>
                <main>
                    <TotalChatLengthProvider>
                        <SidePanel />
                        <MainPanel />
                    </TotalChatLengthProvider>
                    <PlayerPanel />
                    <KeyboardHandler />
                </main>
            </CurrentPageProvider>
        </ModalsProvider>
    </>
}

export default App