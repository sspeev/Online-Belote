import type { Player } from "./Player";

export type Lobby = {
    id: number;
    name: string;
    gamePhase: string;
    gameStarted: boolean;
    connectedPlayers: Array<Player>;
};
