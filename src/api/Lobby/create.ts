import { CREATE_URL } from '../common';

export type Request = {
    playerName: string;
    lobbyName: string;
}

export const url = () => `${CREATE_URL}`