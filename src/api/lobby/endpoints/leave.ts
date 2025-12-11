import { LEAVE_URL } from "../common";

export type Request = {
    playerName: string;
    lobbyId: number;
}

export const url = () => `${LEAVE_URL}`;