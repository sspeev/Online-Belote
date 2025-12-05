import { createFileRoute } from '@tanstack/react-router';
import LobbyLayout from '@/app/components/lobby-temp/LobbyLayout'

export const Route = createFileRoute('/lobby')({
    component: LobbyLayout,
});