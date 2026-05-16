import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { PlayerProvider } from '@/context/player/Provider'
import { usePlayer } from '@/hooks/usePlayer'

const router = createRouter({
  routeTree,
  context: {
    playerName: null, // default
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const RouterInner = () => {
  const { playerData } = usePlayer()
  return (
    <RouterProvider 
      router={router} 
      context={{ playerName: playerData.player.name || null }} 
    />
  )
}

const Router = () => {
  return (
    <PlayerProvider>
      <RouterInner />
    </PlayerProvider>
  )
}

export default Router
