import type { Player } from "./Player";
import type { Game } from '@/types/models/Game.ts'

export type Lobby = {
    id: number;
    name: string;
    gamePhase: 'waiting' | 'splitting' | 'dealing' | 'bidding' | 'playing';
    gameStarted: boolean;
    connectedPlayers: Array<Player>;
    playerCount: number;
    game: Game;
};
