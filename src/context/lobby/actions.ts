import type { Lobby } from "@/types/models/Lobby";

export type LobbyAction =
    | { type: 'CREATE'; playerName: string; }
    | { type: 'JOIN'; playerName: string; lobbyId: number; }
    | { type: 'LEAVE'; playerName: string; lobbyId: number; }
    | { type: 'START_GAME'; lobbyId: number; }
    | { type: 'ERROR'; message: string; }
    | { type: 'PLAYER_NAME'; playerName: string; }
    | { type: 'LOBBY'; lobby: Lobby; }
    | { type: 'AVAILABLE_LOBBIES'; lobbies: Lobby[]; }
    | { type: 'SET_LOADING'; loading: boolean; }
    | { type: 'CONNECTION_STATUS'; status: 'CONNECTED' | 'DISCONNECTED'; }
    | { type: 'IS_HOST'; isHost: boolean; }
    | { type: 'RESET'; }