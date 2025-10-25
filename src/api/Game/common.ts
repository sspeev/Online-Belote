import type { Lobby } from "@/types/models/Lobby";

export const START_URL = `/Game/start`;

export type GameResponse = {
    resInfo: string;
    Lobby? : Lobby;
};