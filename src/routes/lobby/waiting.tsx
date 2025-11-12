import { createFileRoute } from '@tanstack/react-router';
import { WaitingRoom } from '@/app/components/lobby/WaitingRoom'; // Your UI component

// URL will be, for example, /lobby/123/waiting
// It automatically gets wrapped by LobbySectionLayout, so useLobby() works here.
export const Route = createFileRoute('/lobby/waiting')({
    component: WaitingRoom,
});