import { useCallback, useEffect } from 'react'
//import { setCookie } from '@/api/session/endpoints'
import { useSignalR } from '@/hooks/common/useSignalR'
import { usePlayer } from '../player/usePlayer'
import { useLobby } from './useLobby'
import type { Lobby } from '@/types/models/Lobby'

// type UseLobbyRejoinOptions = {
//   persistSessionStorage?: boolean
//   syncCookie?: boolean
// }

export const useLobbyRejoin = (routeLobbyId?: string | number) => {
  const { playerData, dispatchPlayer } = usePlayer()
  const { invoke, connect, signalRData } = useSignalR()
  const { dispatchLobby } = useLobby()

  const handleRejoin = useCallback(async () => {
    if (
      signalRData.status === 'connected' ||
      signalRData.status === 'connecting' ||
      signalRData.status === 'reconnecting'
    ) {
      return
    }

    const parsedRouteLobbyId = routeLobbyId ? Number(routeLobbyId) : NaN
    const targetLobbyId =
      !isNaN(parsedRouteLobbyId) && parsedRouteLobbyId > 0
        ? parsedRouteLobbyId
        : playerData.player.lobbyId

    if (!targetLobbyId || isNaN(targetLobbyId) || targetLobbyId <= 0) {
      console.warn('⚠️ Invalid lobby ID for rejoin:', targetLobbyId)
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

      dispatchPlayer({
        type: 'SET_PLAYER',
        payload: {
          ...playerData.player,
          lobbyId: targetLobbyId,
          status: 'NotStable',
        },
      })
      const storedLobbyName =
        sessionStorage.getItem('lobbyName') ||
        localStorage.getItem('lobbyName') ||
        ''

      await connect(targetLobbyId)
      const lobby = await invoke<Lobby>('JoinLobby', {
        playerName: storedPlayerName,
        lobbyId: targetLobbyId,
        lobbyName: storedLobbyName,
      })
      dispatchLobby({ type: 'SET_LOBBY', lobby })
      console.log('🔄 Successfully rejoined the lobby via SignalR')
    } catch (error) {
      console.error('❌ Failed to rejoin via SignalR:', error)
    }
  }, [
    connect,
    invoke,
    routeLobbyId,
    playerData.player.lobbyId,
    playerData.player.name,
    signalRData.status,
    dispatchPlayer,
    dispatchLobby,
  ])

  useEffect(() => {
    void handleRejoin()
  }, [handleRejoin])
}
