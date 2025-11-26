import { type ReactNode, useReducer } from 'react';

//contexts
import { PlayerContext, defaultState } from './context';

import { playerReducer } from './reducer';

export const PlayerProvider = ({ children }: { children: ReactNode }) => {

  const [state, dispatch] = useReducer(playerReducer, defaultState);
  const providerValue =  {
    playerData: state.playerData,
    dispatchPlayer: dispatch,
  };

  return (
    <PlayerContext.Provider value={providerValue}>
      {children}
    </PlayerContext.Provider>
  );
}