import { JOIN_URL } from "../common";

export type Request = {
    playerName: string;
    lobbyId: string;
}

export const url = () => `${JOIN_URL}`;