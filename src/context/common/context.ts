import { createContext } from "react";

export type PlayerState = {
    playerName: string;
    loading: false,
    isHost: false,
    connectionStatus: 'disconnected' | 'connecting' | 'connected'
};

export const defaultPlayer: PlayerState = {
    playerName: "",
    loading: false,
    isHost: false,
    connectionStatus: 'disconnected'
};

export const PlayerContext = createContext<PlayerState>(defaultPlayer);