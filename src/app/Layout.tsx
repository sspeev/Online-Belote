import { useSignalR } from "@/hooks/useSignalR";
import { Outlet } from "@tanstack/react-router";
import Hero from "./components/lobby/Hero";

const Layout = () => {
  useSignalR();
  return (
    <main className="Layout min-h-screen">
      <Link to="/">Home</Link>
      <Link to="/test">Test</Link>
      <Outlet />
    </main>
  )
}

export default Layout;
