import {
  createContext,
  type PropsWithChildren,
  useState,
} from 'react';
import type { State } from '../utils/types';

const value = +(sessionStorage.getItem('page-id') ?? 0)
export const CurrentPageContext = createContext<State<number>>([value, () => value])

export const CurrentPageProvider = ({children}: PropsWithChildren) => {
  const currentPageState = useState(value)

  return (
    <CurrentPageContext.Provider value={currentPageState}>
      {children}
    </CurrentPageContext.Provider>
  )
}