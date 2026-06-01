import { useContext } from 'react'
import { SignalRContext } from '@/context/global/context'

export const useSignalR = () => 
  useContext(SignalRContext)