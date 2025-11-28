import {useSignalR} from "@/hooks/useSignalR.ts";
import { useEffect } from 'react'
import { type Lobby } from '@/types/models/Lobby.ts'

// Specific hook for lobby events
export const useBeloteHub = (lobby: Lobby, playerName : string) => {

  const { on, off, invoke } = useSignalR(lobby.id)

    useEffect(() => {
        invoke('PlayerJoined', playerName).catch(console.error)

        return () => {
            invoke('PlayerLeft', lobby).catch(console.error)
        }
    }, [lobby.id, invoke])

    // const sendMessage = useCallback((message: string) => {
    //     return invoke('SendMessage', lobbyId, message)
    // }, [lobbyId, invoke])
    //
    // const playCard = useCallback((cardId: string) => {
    //     return invoke('PlayCard', lobbyId, cardId)
    // }, [lobbyId, invoke])

    // return { on, off, sendMessage, playCard }
  return { on, off }
}