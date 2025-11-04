import type { Lobby } from "@/types/models/Lobby";
import { createContext, type Dispatch } from "react";
import type { LobbyAction } from "./actions";

export type LobbyState  = {
    lobby: Lobby | null;
    dispatch: Dispatch<LobbyAction>;
}

export const defaultValues: LobbyState = {
    lobby: null,
    dispatch: () => {}
}

export const LobbyContext = createContext<LobbyState>(defaultValues);