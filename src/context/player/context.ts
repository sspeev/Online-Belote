import { createContext } from "react";
import type { PlayerState } from "./types";

export const defaultPlayer: PlayerState = {
    playerName: "",
    lobbyName: "",
    loading: false,
    isHost: false,
    connectionStatus: 'disconnected'
};

export const PlayerContext = createContext<PlayerState>(defaultPlayer);