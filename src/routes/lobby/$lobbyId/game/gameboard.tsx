import { createFileRoute } from '@tanstack/react-router';
import GameBoard from '@/app/components/game-temp/GameBoard.tsx';

export const Route = createFileRoute('/lobby/$lobbyId/game/gameboard')({
    component: GameBoard,
})