import type { Lobby } from "@/types/models/Lobby";

export type LobbyAction =
    | { type: 'SET_ERROR'; message: string; }
    | { type: 'SET_LOBBY'; lobby: Lobby; }
    | { type: 'SET_AVAILABLE_LOBBIES'; lobbies: Lobby[]; }
    | { type: 'SET_LOADING'; loading: boolean; }
    | { type: 'CONNECTION_STATUS'; status: 'CONNECTED' | 'DISCONNECTED'; }
    | { type: 'IS_HOST'; isHost: boolean; }
    | { type: 'RESET'; }