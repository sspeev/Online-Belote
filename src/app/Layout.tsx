import { Outlet } from "@tanstack/react-router";
import { PlayerContext } from '../context/player/context';
import { useReducer, useMemo } from 'react';
import { playerReducer } from '../context/player/reducer';
import type { PlayerContextType, PlayerState } from '../context/player/types';
// Define the initial state for our reducer
const initialState: PlayerState = {
  playerName: '',
  lobbyName: '',
  loading: false,
  isHost: false,
  connectionStatus: 'disconnected'
};

const Layout = () => {
  // 1. Use the reducer hook. It returns the current state and a dispatch function.
  const [state, dispatch] = useReducer(playerReducer, initialState);

  // 2. Prepare the value for the provider. It's just the state object and the dispatch function.
  //    This object's structure will never change.
  // const providerValue = useMemo<PlayerContextType>(() => ({
  //   state,
  //   dispatch,
  // }), [state, dispatch]);

  return (
    <main className="Layout min-h-screen">
      {/* 3. Provide the single state object and the single dispatch function. */}
      <PlayerContext.Provider value={initialState}>
        <Outlet />
      </PlayerContext.Provider>
    </main>
  )
}

export default Layout;
