import { type ReactNode, useEffect, useReducer } from 'react'
import { LobbyContext, defaultLobby } from './context'
import { lobbyReducer } from './reducer'
import { usePlayer } from '@/hooks/usePlayer'
import { useSignalR } from '@/hooks/useSignalR'
import type { Lobby } from '@/types/models/Lobby'

export const LobbyProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(lobbyReducer, defaultLobby)
  const { playerData } = usePlayer()
  const { signalRData, connect, disconnect, on, off } = useSignalR()

  // Connect to SignalR when lobby is set
  useEffect(() => {
    const lobbyId = state.lobbyData.lobby.id

    if (!lobbyId || !playerData.player.name) return

      // Connect to SignalR for this lobby
      ;(async () => {
      try {
        console.log('🔌 Connecting to lobby', lobbyId)
        await connect(lobbyId)
      } catch (error) {
        console.error('Failed to connect to SignalR:', error)
        dispatch({ type: 'SET_ERROR', message: 'Failed to connect to Game server' })
      }
    })()

    // Disconnect when leaving
    return () => {
      console.log('🔌 Disconnecting from lobby', lobbyId)
      disconnect()
    }
  }, [state.lobbyData.lobby.id, playerData.player.name, connect, disconnect])

  // Register event handlers when connected
  useEffect(() => {
    if (signalRData.status !== 'connected') return

    const onPlayerJoined = (lobby: Lobby) => {
      console.log('✅ EVENT RECEIVED: PlayerJoined', lobby)
      dispatch({ type: 'SET_LOBBY', lobby: lobby })
    }

    const onPlayerLeft = (lobby: Lobby) => {
      console.log('✅ EVENT RECEIVED: PlayerLeft', lobby)
      dispatch({ type: 'SET_LOBBY', lobby: lobby })
    }

    const onStartGame = (lobby: Lobby) => {
      console.log('✅ EVENT RECEIVED: StartGame', lobby)
      dispatch({ type: 'SET_LOBBY', lobby: lobby })
    }

    const onLobbyDeleted = (data: { LobbyId: number; Reason: string }) => {
      console.log('✅ EVENT RECEIVED: LobbyDeleted', data)
      window.location.href = '/'
    }

    on('PlayerJoined', onPlayerJoined)
    on('PlayerLeft', onPlayerLeft)
    on('StartGame', onStartGame)
    on('LobbyDeleted', onLobbyDeleted)

    return () => {
      off('PlayerJoined', onPlayerJoined)
      off('PlayerLeft', onPlayerLeft)
      off('StartGame', onStartGame)
      off('LobbyDeleted', onLobbyDeleted)
    }
  }, [signalRData.status, on, off])

  const providerValue = {
    lobbyData: state.lobbyData,
    dispatchLobby: dispatch,
  }

  return <LobbyContext.Provider value={providerValue}>{children}</LobbyContext.Provider>
}
