import type Announces from "../enums/Announces";
import type { Card } from "./Card";

export type Player = {
  lobbyId: number,
  name: string,
  status: 'Disconnected' | 'Connected' | 'NotStable',
  hoster: boolean,
  announceOffer: Announces,
  hand: Array<Card>,
  image?: string,
}