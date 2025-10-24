import { LEAVE_URL } from "../common";

export type Request = {
    playerName: string;
    lobbyId: string;
}

export const url = () => `${LEAVE_URL}`;