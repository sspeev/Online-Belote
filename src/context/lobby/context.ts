import { createContext } from "react";
import type { LobbyContextValue } from "./types";
import type { Lobby } from "@/types/models/Lobby";

export const defaultLobby: LobbyContextValue = {
    lobbyData: {
        lobby: {
            id: 0,
            name: "",
            connectedPlayers: [],
            gamePhase: "Waiting",
            gameStarted: false,
        },
        availableLobbies: Array<Lobby>(),
        error: null,
    },
    dispatchLobby: () => { }
}

export const LobbyContext = createContext<LobbyContextValue>(defaultLobby);