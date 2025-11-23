import { LobbyProvider } from '@/context/lobby/Provider.tsx'
import { Outlet } from '@tanstack/react-router'

const LobbyLayout = () => {
  return (
    <LobbyProvider>
      <Outlet />
    </LobbyProvider>
  )
}

export default LobbyLayout
