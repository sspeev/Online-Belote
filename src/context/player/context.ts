import { createContext } from "react";
import type { PlayerState } from "./types";

export const defaultPlayer: PlayerState = {
    state: {
        player: null,
        lobbyName: "",
        loading: false,
    },
    dispatch: () => { }
};

export const PlayerContext = createContext<PlayerState>(defaultPlayer);
