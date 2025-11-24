import { JOIN_URL } from "../common";

export type Request = {
    playerName: string;
    selectedLobbyId: number;
}

export const url : () => string
  = () : string => `${JOIN_URL}`;