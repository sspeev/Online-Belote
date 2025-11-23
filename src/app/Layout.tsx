
//components
import { Outlet } from "@tanstack/react-router";

//providers
import { PlayerProvider } from '@/context/player/Provider';

const Layout = () => {
  return (
    <main className="Layout min-h-screen">
      <PlayerProvider>
        <Outlet />
      </PlayerProvider>
    </main>
  )
}

export default Layout;
