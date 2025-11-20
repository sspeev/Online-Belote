
//hooks
import { useReducer, useMemo } from 'react';

//components
import { Outlet } from "@tanstack/react-router";

//contexts
import { PlayerContext } from '@/context/player/context';
import { playerReducer } from '@/context/player/reducer';

//types
import type { PlayerContextValue } from '@/context/player/types';

//variables
import { defaultState } from '@/context/player/context';

const Layout = () => {

  const [state, dispatch] = useReducer(playerReducer, defaultState);
  const providerValue = useMemo<PlayerContextValue>(() => ({
    playerData: state.playerData,
    dispatch,
  }), [state]);

  return (
    <main className="Layout min-h-screen">
      <PlayerContext.Provider value={providerValue}>
        <Outlet />
      </PlayerContext.Provider>
    </main>
  )
}

export default Layout;
