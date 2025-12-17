import { type ReactNode, useReducer } from 'react'

//contexts
import { GameContext, defaultGame } from './context';
import { useLobby } from '@/hooks/useLobby';
import { gameReducer } from './reducer';

export const GameProvider = ({ children }: { children: ReactNode }) => {

  const [state, dispatch] = useReducer(gameReducer, defaultGame);
  const { lobbyData } = useLobby()
  const providerValue =  {
    gameData: state.gameData,
    lobbyId: lobbyData.lobby.id,
    dispatchGame: dispatch,
  };

  return (
    <GameContext.Provider value={providerValue}>
      {children}
    </GameContext.Provider>
  );
}