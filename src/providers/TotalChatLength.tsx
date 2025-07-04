import {
  createContext,
  type PropsWithChildren,
  useState,
} from 'react';
import type { State } from '../utils/types';

const value = +(sessionStorage.getItem('total-length') ?? 0)
export const TotalChatLengthContext = createContext<State<number>>([value, () => value])

export const TotalChatLengthProvider = ({children}: PropsWithChildren) => {
  const chatLengthState = useState(value)

  return (
    <TotalChatLengthContext.Provider value={chatLengthState}>
      {children}
    </TotalChatLengthContext.Provider>
  )
}