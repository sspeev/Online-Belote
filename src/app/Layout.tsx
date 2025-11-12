import { Outlet, Link } from "@tanstack/react-router";
import { PlayerContext } from '../context/player/context';

const Layout = () => {
  return (
    <main className="Layout min-h-screen">
      <Link to="/" />
      <PlayerContext.Provider value={{}}>
        <Outlet />
      </PlayerContext.Provider>
    </main>
  )
}

export default Layout;
