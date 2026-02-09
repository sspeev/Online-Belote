import type { Card } from "./Card";

export type Player = {
  lobbyId: number,
  name: string,
  status: 'Disconnected' | 'Connected' | 'NotStable',
  hoster: boolean,
  announceOffer: 'None' | 'Pass' | 'Clubs' | 'Diamonds' | 'Hearts' | 'Spades' | 'NoTrumps' | 'AllTrumps',
  hand: Array<Card>,
}