import { createFileRoute } from '@tanstack/react-router';
import WaitingRoom from '@/app/components/pages/waitingPage/Waiting';

export const Route = createFileRoute('/lobby/$lobbyId/waiting')({
  component: WaitingRoom,
});