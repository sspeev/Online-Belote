
//components
import { Outlet } from "@tanstack/react-router";

//providers
import { PlayerProvider } from '@/context/player/Provider';
import { SignalRProvider} from '@/context/global/Provider.tsx'

const Layout = () => {
  return (
    <main className="Layout min-h-screen">
      <PlayerProvider>
        <SignalRProvider>
          <Outlet />
        </SignalRProvider>
      </PlayerProvider>
    </main>
  )
}

export default Layout;
