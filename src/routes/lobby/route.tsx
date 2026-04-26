import { createFileRoute, Outlet } from '@tanstack/react-router';
import { LobbyProvider } from '@/context/lobby/Provider';

export const Route = createFileRoute('/lobby')({
    component: () => (
        <LobbyProvider>
            <Outlet />
        </LobbyProvider>
    ),
});