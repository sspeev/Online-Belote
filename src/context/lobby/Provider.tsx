import { type ReactNode, useReducer } from 'react';

//contexts
import { LobbyContext, defaultLobby } from './context';

import { lobbyReducer } from './reducer';

export const LobbyProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(lobbyReducer, defaultLobby.lobbyData);

  const providerValue = {
    lobbyData: state,
    dispatchLobby: dispatch,
  };

  return (
    <LobbyContext.Provider value={providerValue}>
      {children}
    </LobbyContext.Provider>
  );
};
