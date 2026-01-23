import type { Lobby } from "@/types/models/Lobby";

export const CREATE_URL = `/Lobby/create`;
export const LOBBIES_URL = `/Lobby/listLobbies`;
export const FIND_URL = (lobbyId : number) => `Lobby/${lobbyId}`;

export type LobbyResponse = {
    lobby: Lobby;
    lobbies: Array<Lobby>;
    resInfo: string;
    isHostHere?: boolean;
};
