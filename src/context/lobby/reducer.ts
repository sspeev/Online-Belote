// import type { Lobby } from "@/types/models/Lobby";
// import type { LobbyAction } from "./actions";

// export const lobbyReducer = (
//     state: Lobby | null,
//     action: LobbyAction
// ): Lobby | null => {
//     switch (action.type) {
//         case 'CREATE':
//             return { ...state, playerName: action.playerName };
//         case 'JOIN':
//             return { ...state, playerName: action.playerName, lobbyId: action.lobbyId };
//         case 'LEAVE':
//             return { ...state, playerName: action.playerName, lobbyId: action.lobbyId };
//         default:
//             return state;
//     }
// }