import type { Player } from "./Player";
import type { Game } from '@/types/models/Game.ts'

export type Lobby = {
    id: number;
    name: string;
    connectedPlayers: Array<Player>;
    gameStarted: boolean;
    game: Game;
    gamePhase: 'waiting' | 'splitting' | 'dealing' | 'bidding' | 'playing';
    playerCount: number;
};
