import type { Lobby } from "@/types/models/Lobby";

export const API_BASE_URL = 'http://localhost:3000/api';
export const CREATE_URL = `${API_BASE_URL}/Lobby/create`;
export const JOIN_URL = `${API_BASE_URL}/Lobby/join`;
export const LEAVE_URL = `${API_BASE_URL}/Lobby/leave`;
export const LOBBIES_URL = `${API_BASE_URL}/Lobby/listLobbies`;
export const START_URL = `${API_BASE_URL}/Lobby/start`;

export type LobbyResponse = {
    lobby: Lobby;
    lobbies?: Lobby[];
};