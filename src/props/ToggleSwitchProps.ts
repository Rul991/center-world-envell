export default interface ToggleSwitchProps {
    startValue?: boolean
    onToggle?: (toggled: boolean) => void
    title: string
}