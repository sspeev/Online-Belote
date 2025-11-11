import type { Lobby } from "@/types/models/Lobby";
import { createContext, type Dispatch } from "react";
import type { LobbyAction } from "./actions";

export type LobbyState = {
    lobby: Lobby | null;
    availableLobbies: Array<Lobby>,
    error: null,
    dispatch: Dispatch<LobbyAction>;
}

export const defaultLobby: LobbyState = {
    lobby: null,
    availableLobbies: Array<Lobby>(),
    error: null, 
    dispatch: () => { }
}

export const LobbyContext = createContext<LobbyState>(defaultLobby);