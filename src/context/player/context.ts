import { createContext } from "react";
import type { PlayerContextValue } from "./types";

export const defaultState: PlayerContextValue = {
    playerData: {
        player: {
            lobbyId: 0,
            name: "",
            host: false,
            status: 'Disconnected',
            lastSpitter: false,
            isStarter: false,
            announceOffer: 'None',
            hand: [],
        },
        lobbyName: "",
        selectedLobbyId: 0,
        loading: false,
    },
    dispatchPlayer: () => { }
};

export const PlayerContext = createContext<PlayerContextValue>(defaultState);
