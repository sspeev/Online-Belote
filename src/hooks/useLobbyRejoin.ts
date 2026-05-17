import { useCallback, useEffect } from 'react'
//import { setCookie } from '@/api/session/endpoints'
import { useSignalR } from '@/hooks/useSignalR'
import { usePlayer } from './usePlayer'

// type UseLobbyRejoinOptions = {
//   persistSessionStorage?: boolean
//   syncCookie?: boolean
// }

export const useLobbyRejoin = (
//   {
//   persistSessionStorage = false,
//   syncCookie = false,
// }: UseLobbyRejoinOptions
) => {

  const { playerData, dispatchPlayer } = usePlayer()
  const { invoke, connect, signalRData } = useSignalR()

  const handleRejoin = useCallback(async () => {
    if (
      signalRData.status === 'connected' ||
      signalRData.status === 'connecting' ||
      signalRData.status === 'reconnecting'
    ) {
      return
    }

    try {
      const storedPlayerName =
        playerData.player.name ||
        sessionStorage.getItem('playerName') ||
        localStorage.getItem('playerName')

      if (!storedPlayerName) {
        console.error('Missing player name for lobby rejoin')
        return
      }

      // if (persistSessionStorage) {
      //   sessionStorage.setItem('playerName', storedPlayerName)
      // }

      // if (syncCookie) {
      //   await setCookie(storedPlayerName)
      // }
      dispatchPlayer({ type: 'SET_PLAYER', payload: {
        ...playerData.player,
        status: 'NotStable'
      }})
      await connect(playerData.player.lobbyId)
      await invoke('JoinLobby', {
        playerName: storedPlayerName,
        lobbyId: playerData.player.lobbyId,
        lobbyName: playerData.lobbyName,
      })
      console.log('🔄 Successfully rejoined the lobby via SignalR')
    } catch (error) {
      console.error('❌ Failed to rejoin via SignalR:', error)
    }
  }, [
    connect,
    invoke,
    playerData.player.lobbyId,
    playerData.lobbyName,
    //persistSessionStorage,
    playerData.player.name,
    signalRData.status,
    //syncCookie,
  ])

  useEffect(() => {
    void handleRejoin()
  }, [handleRejoin])
}
