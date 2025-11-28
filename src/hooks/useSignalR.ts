import { useCallback } from 'react'
import { buildConnection } from '../api/services/signalRService'

export const useSignalR = (lobbyId: number) => {
  const on = useCallback((eventName: string, callback: (...args: any[]) => void) => {
    buildConnection(lobbyId).on(eventName, callback)
  }, [])

  const off = useCallback((eventName: string) => {
    buildConnection(lobbyId).off(eventName)
  }, [])

  const invoke = useCallback(async (methodName: string, ...args: any[]) => {
    return await buildConnection(lobbyId).invoke(methodName, ...args)
  }, [])

  return { on, off, invoke }
}