import { JOIN_URL } from "../common";

export type Request = {
    playerName: string;
    selectedLobbyId: number;
}

export const url = () => `${JOIN_URL}`;