import './scss/index.scss';
import Header from './components/other/Header';
import MainPanel from './components/panels/MainPanel';
import PlayerPanel from './components/panels/PlayerPanel';
import SidePanel from './components/panels/SidePanel';
import { CurrentPageProvider } from './providers/CurrentPage';
import KeyboardHandler from './components/keyboard/SwitchPageKeyboardHandler'
import { TotalChatLengthProvider } from './providers/TotalChatLength'

const App = () => {
  return <>
    <Header />
    <CurrentPageProvider>
      <KeyboardHandler />
      <main>
        <TotalChatLengthProvider>
          <SidePanel />
          <MainPanel />
        </TotalChatLengthProvider>
        <PlayerPanel />
      </main>
    </CurrentPageProvider>
  </>
}

export default App