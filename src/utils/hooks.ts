import { useContext, useEffect, useState, type DependencyList } from 'react';
import { CurrentPageContext } from '../providers/CurrentPage'
import { MILLSECONDS_IN_SECOND, UPDATE_PER_SECONDS } from './consts'
import { TotalChatLengthContext } from '../providers/TotalChatLength'

export const useToggle = (start: boolean): [boolean, () => void] => {
    const [isToggled, setToggle] = useState(start)

    return [
        isToggled,
        () => setToggle(!isToggled)
    ]
}

export const useCurrentPage = (): [number, (id: number) => void] => {
    const [currentPage, setCurrentPage] = useContext(CurrentPageContext)
    const minPageId = 0
    const maxPageId = 2

    return [
        currentPage,
        (id: number) => {
            let usedId = id

            if(usedId < minPageId) usedId = maxPageId
            else if(usedId > maxPageId) usedId = minPageId

            setCurrentPage(usedId)
            sessionStorage.setItem('page-id', usedId.toString())
        }
    ]
}

export const useUpdateInterval = (callback: () => void, deps?: DependencyList) => {
    useEffect(() => {
        const intervalId = setInterval(
            callback, 
            MILLSECONDS_IN_SECOND / UPDATE_PER_SECONDS
        )

        return () => clearInterval(intervalId)
    }, deps)
}

export const useTotalChatLength = () => {
    const [length, setLength] = useContext(TotalChatLengthContext)

    return [
        length, 
        (len: number) => {
            setLength(len)
            sessionStorage.setItem('total-length', len.toString())
        }
    ] as [number, (len: number) => void]
}