export default interface StringListProps {
    values: string[]
    choosedValue?: string
    onChoose?: (value: string) => void
    title: string
}