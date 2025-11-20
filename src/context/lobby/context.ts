import type { Lobby } from "@/types/models/Lobby";
import { createContext } from "react";
import type { LobbyState } from "./types";

export const defaultLobby: LobbyState = {
    lobby: null,
    availableLobbies: Array<Lobby>(),
    error: null,
    dispatch: () => { }
}

export const LobbyContext = createContext<LobbyState>(defaultLobby);
