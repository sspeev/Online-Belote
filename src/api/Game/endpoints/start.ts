import { START_URL } from "../common";

export type Request = {
    lobbyId: string;
}

export const url = () => `${START_URL}`;