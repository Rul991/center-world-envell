export default interface NumberRangeProps {
    min?: number
    max?: number
    value?: number
    onChange?: (value: number) => void
    title: string
}