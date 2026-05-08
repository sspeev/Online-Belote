import { createFileRoute } from '@tanstack/react-router';
import { GameBoard } from '@/app/components/pages/boardPage/GameBoard';

export const Route = createFileRoute('/lobby/$lobbyId/game/gameboard')({
    component: GameBoard,
})