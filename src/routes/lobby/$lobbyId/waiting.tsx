import { createFileRoute, redirect } from '@tanstack/react-router'
import WaitingRoom from '@/app/components/pages/waitingPage/Waiting'

export const Route = createFileRoute('/lobby/$lobbyId/waiting')({
  beforeLoad: ({ context }) => {
    if (!context.playerName) {
      throw redirect({ to: '/' })
    }
  },
  component: WaitingRoom,
})
