import type { Dispatch } from "react";
import type { LobbyAction } from "./actions";

//types
import type { Lobby } from "@/types/models/Lobby";

export type LobbyState = {
    lobby: Lobby;
    availableLobbies: Array<Lobby>;
    error: null | string;
};

export type LobbyContextValue = {
    lobbyData: LobbyState;
    dispatch: Dispatch<LobbyAction>;
};