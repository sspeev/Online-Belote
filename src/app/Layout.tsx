
//components
import { Outlet, useLocation } from "@tanstack/react-router";
import Footer from './components/pages/homePage/components/Footer';
import Navbar from "./components/pages/homePage/components/Navbar";

//providers
import { PlayerProvider } from '@/context/player/Provider';
import { SignalRProvider} from '@/context/global/Provider.tsx'
import { ThemeProvider } from '@/context/theme/ThemeContext'

const Layout = () => {
  const location = useLocation();
  const hideHeaderFooter =
     location.pathname === '/game' || location.pathname.includes('/game/')

  return (
    <ThemeProvider>
      <main className="Layout min-h-screen flex flex-col">
        <PlayerProvider>
          <SignalRProvider>
            {!hideHeaderFooter && <Navbar />}
            <div className="flex-1 flex flex-col">
              <Outlet />
            </div>
            {!hideHeaderFooter && <Footer />}
          </SignalRProvider>
        </PlayerProvider>
      </main>
    </ThemeProvider>
  )
}

export default Layout;
