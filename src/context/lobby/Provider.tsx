import { type ReactNode, useMemo, useReducer } from 'react';

//contexts
import { LobbyContext } from './context';
import { defaultLobby } from './context';

import { lobbyReducer } from './reducer';

//types
import { type LobbyContextValue } from './types';

export const LobbyProvider = ({ children }: { children: ReactNode }) => {

    const [state, dispatch] = useReducer(lobbyReducer, defaultLobby);
    const providerValue = useMemo<LobbyContextValue>(() => ({
        lobbyData: state.lobbyData,
        dispatchLobby: dispatch,
    }), [state]);

    return (
        <LobbyContext.Provider value= { providerValue } >
        { children }
        </LobbyContext.Provider>
    );
}