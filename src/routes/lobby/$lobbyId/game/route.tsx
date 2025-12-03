import { createFileRoute } from '@tanstack/react-router'
import GameLayout from '@/app/components/lobby/GameLayout.tsx'
export const Route = createFileRoute('/lobby/$lobbyId/game')({
  component: GameLayout,
})
