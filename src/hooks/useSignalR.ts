import { useContext } from 'react'
import { SignalRContext } from '@/context/global/context'

export const useSignalR = () => {
  const context = useContext(SignalRContext)

  return context
}