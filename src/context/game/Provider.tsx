import { type ReactNode, useEffect, useReducer } from 'react'

//contexts
import { GameContext, defaultGame } from './context';
import { useLobby } from '@/hooks/useLobby';
import { gameReducer } from './reducer';
import { useSignalR } from '@/hooks/useSignalR.ts'
import { usePlayer } from '@/hooks/usePlayer.ts'

export const GameProvider = ({ children }: { children: ReactNode }) => {

  const [state, dispatch] = useReducer(gameReducer, defaultGame);
  const { playerData } = usePlayer()
  const { signalRData, connect, disconnect, on, off } = useSignalR()
  const { lobbyData } = useLobby()
  const providerValue =  {
    gameData: {
      ...state.gameData,
      game: lobbyData.lobby.game
    },
    lobbyId: lobbyData.lobby.id,
    dispatchGame: dispatch,
  };

  useEffect(() => {
    const lobbyId = lobbyData.lobby.id

    if (!lobbyId || !playerData.player.name) return

      // Connect to SignalR for this lobby
      (async () => {
      try {
        console.log('🔌 Connecting to lobby', lobbyId)
        await connect(lobbyId)
      } catch (error) {
        console.error('Failed to connect to SignalR:', error)
        dispatch({ type: 'SET_ERROR', message: 'Failed to connect to game server' })
      }
    })()

    // Disconnect when leaving
    return () => {
      console.log('🔌 Disconnecting from lobby', lobbyId)
      disconnect()
    }
  }, [lobbyData.lobby.id, playerData.player.name, connect, disconnect])

  useEffect(() => {
    if (signalRData.status !== 'connected') return;

    const onSplittingCards = () => {
      console.log('✅ EVENT RECEIVED:  SplittingCards');
      // Update UI for all connected players
    };

    on('SplittingCards', onSplittingCards);

    return () => {
      off('SplittingCards', onSplittingCards);
    };
  }, [signalRData. status, on, off]);

  return (
    <GameContext.Provider value={providerValue}>
      {children}
    </GameContext.Provider>
  );
}