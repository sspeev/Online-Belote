import { Outlet, Link } from "@tanstack/react-router";
import { PlayerProvider } from "@/context/PlayerContext"; // Assuming this path

const Layout = () => {
  return (
    <main className="Layout min-h-screen">
      <Link to="/" />
      <PlayerProvider>
        <Outlet />
      </PlayerProvider>
    </main>
  )
}

export default Layout;
