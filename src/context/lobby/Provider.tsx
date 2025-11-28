import { type ReactNode, useEffect, useReducer } from 'react'

//contexts
import { LobbyContext, defaultLobby } from './context';

import { lobbyReducer } from './reducer';
import { usePlayer } from '@/hooks/usePlayer.ts'
import type { Lobby } from '@/types/models/Lobby.ts'
import { useBeloteHub } from '@/hooks/useBeloteHub.ts'
import { start, stop } from '@/api/services/signalRService.ts'

export const LobbyProvider = ({ children }: { children: ReactNode }) => {

  const [state, dispatch] = useReducer(lobbyReducer, defaultLobby);
  const { playerData } = usePlayer()
  const { on, off } = useBeloteHub(state.lobbyData.lobby, playerData.player.name);

  useEffect(() => {
    if(!state.lobbyData.lobby.id || !playerData.player.name) return;

    const onPlayerJoined = (lobby : Lobby) => {
      console.log('✅ EVENT RECEIVED: PlayerJoined', lobby);
      dispatch({ type: 'SET_LOBBY', lobby: lobby });
    };
    const onPlayerLeft = (lobby : Lobby) => {
      console.log('✅ EVENT RECEIVED: PlayerLeft', lobby);
      dispatch({ type: 'SET_LOBBY', lobby: lobby });
    };
    const onStartGame = (lobby : Lobby) => {
      console.log('✅ EVENT RECEIVED: StartGame', lobby);
      dispatch({ type: 'SET_LOBBY', lobby: lobby });
    };

    on('PlayerJoined', onPlayerJoined);
    on('PlayerLeft', onPlayerLeft);
    on('StartGame', onStartGame);

    (async () => {
      try {
        //dispatchPlayer({ type: 'SET_PLAYER', payload: 'connecting' });
        await start();
        //dispatch({ type: SET_CONNECTION_STATUS, payload: 'connected' });
      } catch (error) {
        //dispatch({ type: SET_ERROR, payload: error.message });
      }
    })();

    return () => {
      off('PlayerJoined', onPlayerJoined);
      off('PlayerLeft', onPlayerLeft);
      off('StartGame', onStartGame);
      stop();
    };
  }, [state.lobbyData.lobby.id, playerData.player.name]);
  
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
