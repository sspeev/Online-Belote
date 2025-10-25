import { useSignalR } from "@/hooks/useSignalR";
import { Outlet } from "@tanstack/react-router";

const Layout = () => {
  useSignalR();
  return (
    <div className="App flex flex-col w-full min-h-screen justify-between bg-gradient-to-l from-primary-dark to-primary-light">
      <h3 className="inline-block w-min h-min whitespace-nowrap text-left text-white text-lg font-semibold font-default">
        ALFA 0.1.0
      </h3>

      <main>
        {/* <GameLobby /> */}
        <Outlet />
      </main>

      <footer className="text-center text-white text-sm font-semibold font-default">
        &copy; Stoyan Peev 2025
      </footer>
    </div>
  )
}

export default Layout;
