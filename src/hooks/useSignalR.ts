import { useEffect, useCallback } from 'react'
import { signalRService } from '../api/services/signalRService'

export const useSignalR = () => {
  const on = useCallback((eventName: string, callback: (...args: any[]) => void) => {
    signalRService.on(eventName, callback)
  }, [])

  const off = useCallback((eventName: string) => {
    signalRService.off(eventName)
  }, [])

  const invoke = useCallback(async (methodName: string, ...args: any[]) => {
    return await signalRService.invoke(methodName, ...args)
  }, [])

  return { on, off, invoke }
}

// Specific hook for lobby events
export const useLobbySignalR = (lobbyId: number) => {
  const { on, off, invoke } = useSignalR()

  useEffect(() => {
    // Join lobby room
    invoke('JoinLobby', lobbyId)

    // Cleanup: leave lobby on unmount
    return () => {
      invoke('LeaveLobby', lobbyId)
    }
  }, [lobbyId, invoke])

  const sendMessage = useCallback((message: string) => {
    return invoke('SendMessage', lobbyId, message)
  }, [lobbyId, invoke])

  const playCard = useCallback((cardId: string) => {
    return invoke('PlayCard', lobbyId, cardId)
  }, [lobbyId, invoke])

  return { on, off, sendMessage, playCard }
}