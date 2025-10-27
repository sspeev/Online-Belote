import { useSignalR } from "@/hooks/useSignalR";
//import { Outlet } from "@tanstack/react-router";
import Hero from "./components/lobby/Hero";

const Layout = () => {
  useSignalR();
  return (
    <main className="Layout min-h-screen">
      <Hero />
    </main>
  )
}

export default Layout;
