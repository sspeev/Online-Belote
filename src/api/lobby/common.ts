import type { Lobby } from "@/types/models/Lobby";
import type { ApiResponse } from "@/api/axios";

export const CREATE_URL = `Lobby/create`;
export const LOBBIES_URL = `Lobby/listLobbies`;
export const FIND_URL = (lobbyId: number) => `Lobby/${lobbyId}`;

export interface LobbyData {
    lobby: Lobby;
}

export interface LobbiesData {
    lobbies: Lobby[];
}

export type LobbyResponse = ApiResponse<LobbyData>;
export type LobbiesResponse = ApiResponse<LobbiesData>;
export type LobbyFindResponse = ApiResponse<LobbyData>;