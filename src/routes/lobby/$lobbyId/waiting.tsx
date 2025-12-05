import { createFileRoute } from '@tanstack/react-router';
import WaitingRoom from '@/app/components/lobby-temp/Waiting';

export const Route = createFileRoute('/lobby/$lobbyId/waiting')({
  component: WaitingRoom,
});