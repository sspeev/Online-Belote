import { type ReactNode, useEffect, useReducer } from 'react'

//contexts
import { GameContext, defaultGame } from './context';

import { gameReducer } from './reducer';
import type { Lobby } from '@/types/models/Lobby.ts'

export const PlayerProvider = ({ children }: { children: ReactNode }) => {

  const [state, dispatch] = useReducer(gameReducer, defaultGame);
  const providerValue =  {
    playerData: state.gameData,
    dispatchPlayer: dispatch,
  };

  // useEffect(() => {
  //   const lobbyId = state.lobbyData.lobby.id
  //
  //   if (!lobbyId || !playerData.player.name) return
  //
  //     // Connect to SignalR for this lobby
  //     ;(async () => {
  //     try {
  //       console.log('🔌 Connecting to lobby', lobbyId)
  //       await connect(lobbyId)
  //     } catch (error) {
  //       console.error('Failed to connect to SignalR:', error)
  //       dispatch({ type: 'SET_ERROR', message: 'Failed to connect to game server' })
  //     }
  //   })()
  //
  //   // Disconnect when leaving
  //   return () => {
  //     console.log('🔌 Disconnecting from lobby', lobbyId)
  //     disconnect()
  //   }
  // }, [state.lobbyData.lobby.id, playerData.player.name, connect, disconnect])
  //
  // // Register event handlers when connected
  // useEffect(() => {
  //   if (signalRData.status !== 'connected') return
  //
  //   const onPlayerJoined = (lobby: Lobby) => {
  //     console.log('✅ EVENT RECEIVED: PlayerJoined', lobby)
  //     dispatch({ type: 'SET_LOBBY', lobby: lobby })
  //   }
  //
  //   const onPlayerLeft = (lobby: Lobby) => {
  //     console.log('✅ EVENT RECEIVED: PlayerLeft', lobby)
  //     dispatch({ type: 'SET_LOBBY', lobby: lobby })
  //   }
  //
  //   const onStartGame = (lobby: Lobby) => {
  //     console.log('✅ EVENT RECEIVED: StartGame', lobby)
  //     dispatch({ type: 'SET_LOBBY', lobby: lobby })
  //   }
  //
  //   const onLobbyDeleted = (data: { LobbyId: number; Reason: string }) => {
  //     console.log('✅ EVENT RECEIVED: LobbyDeleted', data)
  //     window.location.href = '/'
  //   }
  //
  //   on('PlayerJoined', onPlayerJoined)
  //   on('PlayerLeft', onPlayerLeft)
  //   on('StartGame', onStartGame)
  //   on('LobbyDeleted', onLobbyDeleted)
  //
  //   return () => {
  //     off('PlayerJoined', onPlayerJoined)
  //     off('PlayerLeft', onPlayerLeft)
  //     off('StartGame', onStartGame)
  //     off('LobbyDeleted', onLobbyDeleted)
  //   }
  // }, [signalRData.status, on, off])


  return (
    <GameContext.Provider value={providerValue}>
      {children}
    </GameContext.Provider>
  );
}