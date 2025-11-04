import type { Lobby } from "@/types/models/Lobby";
import type { LobbyAction } from "./actions";

export const lobbyReducer = (
    state: Lobby | null,
    action: LobbyAction
): Lobby | null => {
    switch (action.type) {
        case 'CREATE':
    }
}