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
import { LobbyProvider } from '@/context/lobby/Provider';
import { PlayerProvider } from '@/context/player/Provider';

const Layout = () => {
  return (
    <main className="Layout min-h-screen">
      <PlayerProvider>
        <Outlet /> {/* This renders the child route */}
      </PlayerProvider>
    </main>
  )
}

export default Layout;
