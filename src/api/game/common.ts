import type { Lobby } from '@/types/models/Lobby';
import type { ApiResponse } from '@/api/axios';

export const START_URL = (lobbyId: number) => `/${lobbyId}/start`;

export interface GameStartData {
    lobby: Lobby;
}

export type GameStartResponse = ApiResponse<GameStartData>;