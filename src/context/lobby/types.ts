import type { Lobby } from "@/types/models/Lobby";
import type { Dispatch } from "react";
import type { LobbyAction } from "./actions";

export type LobbyState = {
    lobby: Lobby | null;
    availableLobbies: Array<Lobby>;
    error: null;
    dispatch: Dispatch<LobbyAction>;
};
