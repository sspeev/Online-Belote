
//components
import { Outlet, useLocation } from "@tanstack/react-router";
import Footer from './components/pages/homePage/components/Footer';
import Navbar from "./components/pages/homePage/components/Navbar";
import PageTransition from "./components/common/PageTransition";

//providers
import { SignalRProvider} from '@/context/global/Provider.tsx'
import { ThemeProvider } from '@/context/theme/ThemeContext'

//cookies
//import { issueCookie } from "@/api/session/endpoints";

//analytics
import { Analytics } from '@vercel/analytics/react'

const Layout = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/game' || location.pathname.includes('/game/')

    // useEffect(()=> {
    //   issueCookie()
    // }, [])

  return (
    <ThemeProvider>
      <main className="Layout min-h-screen flex flex-col">
        <SignalRProvider>
          {!hideHeaderFooter && <Navbar />}
          <div className="flex-1 flex flex-col">
            <PageTransition>
              <Outlet />
            </PageTransition>
          </div>
          {!hideHeaderFooter && <Footer />}
        </SignalRProvider>
      </main>
      <Analytics />
    </ThemeProvider>
  )
}

export default Layout;
