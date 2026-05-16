import { useCallback, useEffect } from 'react'
import { setCookie } from '@/api/session/endpoints'
import { useSignalR } from '@/hooks/useSignalR'

type UseLobbyRejoinOptions = {
  lobbyId: string
  playerName?: string
  lobbyName?: string
  persistSessionStorage?: boolean
  syncCookie?: boolean
}

export const useLobbyRejoin = ({
  lobbyId,
  playerName,
  lobbyName,
  persistSessionStorage = false,
  syncCookie = false,
}: UseLobbyRejoinOptions) => {
  const { invoke, connect, signalRData } = useSignalR()

  const handleRejoin = useCallback(async () => {
    if (
      signalRData.status === 'connected' ||
      signalRData.status === 'connecting' ||
      signalRData.status === 'reconnecting'
    ) {
      return
    }

    const parsedLobbyId = Number(lobbyId)
    if (Number.isNaN(parsedLobbyId)) {
      console.error(`Invalid lobby id for rejoin: ${lobbyId}`)
      return
    }

    try {
      const storedPlayerName =
        playerName ||
        sessionStorage.getItem('playerName') ||
        localStorage.getItem('playerName')

      if (!storedPlayerName) {
        console.error('Missing player name for lobby rejoin')
        return
      }

      if (persistSessionStorage) {
        sessionStorage.setItem('playerName', storedPlayerName)
        sessionStorage.setItem('lastLobbyId', lobbyId)
      }

      if (syncCookie) {
        await setCookie(storedPlayerName)
      }

      await connect(parsedLobbyId)
      await invoke('JoinLobby', {
        playerName: storedPlayerName,
        lobbyId: parsedLobbyId,
        lobbyName: lobbyName || '',
      })
      console.log('🔄 Successfully rejoined the lobby via SignalR')
    } catch (error) {
      console.error('❌ Failed to rejoin via SignalR:', error)
    }
  }, [
    connect,
    invoke,
    lobbyId,
    lobbyName,
    persistSessionStorage,
    playerName,
    signalRData.status,
    syncCookie,
  ])

  useEffect(() => {
    void handleRejoin()
  }, [handleRejoin])
}
