import type { Dispatch } from "react";
import type { PlayerAction } from "./actions";
import type { Player } from "@/types/models/Player";

export type PlayerState = {
    state: {
        player: Player | null;
        lobbyName: string;
        loading: false;
    };
    dispatch: Dispatch<PlayerAction>;
};