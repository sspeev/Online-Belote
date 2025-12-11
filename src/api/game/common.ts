import type { Lobby } from '@/types/models/Lobby.ts'

export const START_URL = (lobbyId: number) => `/${lobbyId}/start`

export type GameResponse = {
    resInfo: string;
    Lobby? : Lobby;
};