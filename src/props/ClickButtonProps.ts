import type { PropsWithChildren } from 'react';

export default interface ClickButtonProps extends PropsWithChildren {
    delay?: number
    onClick?: () => void
    defaultClassName?: string
    clickedClassName?: string
}