import { type ReactNode, useReducer, useMemo } from 'react';

//contexts
import { PlayerContext } from './context';
import { defaultState } from './context';

import { playerReducer } from './reducer';

//types
import type { PlayerContextValue } from './types';

export const PlayerProvider = ({ children }: { children: ReactNode }) => {

  const [state, dispatch] = useReducer(playerReducer, defaultState);
  const providerValue = useMemo<PlayerContextValue>(() => ({
    playerData: state.playerData,
    dispatchPlayer: dispatch,
  }), [state]);

  return (
    <PlayerContext.Provider value={providerValue}>
      {children}
    </PlayerContext.Provider>
  );
}