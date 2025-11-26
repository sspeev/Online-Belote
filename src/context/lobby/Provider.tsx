import { type ReactNode, useReducer } from 'react';

//contexts
import { LobbyContext, defaultLobby } from './context';

import { lobbyReducer } from './reducer';

export const LobbyProvider = ({ children }: { children: ReactNode }) => {

  const [state, dispatch] = useReducer(lobbyReducer, defaultLobby);
  const providerValue = {
    lobbyData: state.lobbyData,
    dispatchLobby: dispatch,
  };

  return (
    <LobbyContext.Provider value={providerValue}>
      {children}
    </LobbyContext.Provider>
  );
};
