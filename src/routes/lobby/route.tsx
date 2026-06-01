import { createFileRoute, Outlet } from '@tanstack/react-router';
import { LobbyProvider } from '@/context/lobby/Provider';

function LobbyLayout() {
    return (
        <LobbyProvider>
            <Outlet />
        </LobbyProvider>
    );
}

export const Route = createFileRoute('/lobby')({
    component: LobbyLayout,
});