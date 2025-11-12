import type { PlayerAction } from "./actions";

export type PlayerState = {
    playerName: string;
    lobbyName: string;
    loading: false;
    isHost: false;
    connectionStatus: 'disconnected' | 'connecting' | 'connected';
};

export type PlayerContextType = {
    state: PlayerState;
    dispatch: React.Dispatch<PlayerAction>;
};