import ChatToggleButton from '../../buttons/ChatToggleButton'
import ToggleButton from '../../buttons/ToggleButton';

const SidePanel = () => {
    return <div className='padding-panel'>
        <ToggleButton title='Главное' id={0}></ToggleButton>
        <ChatToggleButton />
        <ToggleButton title='Настройки' id={2}></ToggleButton>
    </div>
}

export default SidePanel