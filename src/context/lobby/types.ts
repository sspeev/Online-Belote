import type { Dispatch } from "react";
import type { LobbyAction } from "./actions";

//types
import type { Lobby } from "@/types/models/Lobby";
import type { Game } from "@/types/models/Game";

export type LobbyState = {
    lobby: Omit<Lobby, 'game'>;
    game: Game;
    error: null | string;
};

export type LobbyContextValue = {
    lobbyData: LobbyState;
    dispatchLobby: Dispatch<LobbyAction>;
};