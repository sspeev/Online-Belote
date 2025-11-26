import { createFileRoute } from '@tanstack/react-router';
import LobbyLayout from '../../app/components/lobby/LobbyLayout'

export const Route = createFileRoute('/lobby')({
    component: LobbyLayout,
});