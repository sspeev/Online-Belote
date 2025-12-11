import { START_URL } from "../common";

export type Request = {
    lobbyId: number;
}

export const url = (lobbyId : number) => `${START_URL(lobbyId)}`;