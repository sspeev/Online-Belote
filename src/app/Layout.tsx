
//components
import { Outlet, useLocation } from "@tanstack/react-router";
import Footer from './components/pages/homePage/components/Footer';

//providers
import { PlayerProvider } from '@/context/player/Provider';
import { SignalRProvider} from '@/context/global/Provider.tsx'

const Layout = () => {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith('/game');

  return (
    <main className="Layout min-h-screen flex flex-col">
      <PlayerProvider>
        <SignalRProvider>
          <div className="flex-1 flex flex-col">
            <Outlet />
          </div>
          {!hideFooter && <Footer />}
        </SignalRProvider>
      </PlayerProvider>
    </main>
  )
}

export default Layout;
