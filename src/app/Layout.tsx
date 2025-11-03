import { useSignalR } from "@/hooks/useSignalR";
import { Outlet, Link } from "@tanstack/react-router";


const Layout = () => {
  useSignalR();
  return (
    <main className="Layout min-h-screen">
      <Link to="/" />
      <Outlet />
    </main>
  )
}

export default Layout;
