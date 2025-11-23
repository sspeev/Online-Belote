import type { Dispatch } from "react";
import type { PlayerAction } from "./actions";

//types
import type { Player } from "@/types/models/Player";

export type PlayerState = {
    player: Player;
    lobbyName: string;
    selectedLobbyId: string;
    loading: boolean;
};

export type PlayerContextValue = {
    playerData: PlayerState;
    dispatchPlayer: Dispatch<PlayerAction>;
};