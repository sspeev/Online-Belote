import { Outlet } from '@tanstack/react-router'
import { LobbyProvider } from '@/context/LobbyContext'

export function LobbyLayout() {
  return (
    <LobbyProvider>
      <Outlet />
    </LobbyProvider>
  )
}