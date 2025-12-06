import { createFileRoute } from '@tanstack/react-router';
import GameBoard from '@/app/components/Game/GameBoard.tsx';

export const Route = createFileRoute('/lobby/$lobbyId/game/gameboard')({
    component: GameBoard,
})