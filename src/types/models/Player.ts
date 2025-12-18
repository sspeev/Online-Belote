import type { Card } from "./Card";

export type Player = {
  lobbyId: number,
  name: string,
  status: 'Disconnected' | 'Connected' | 'NotStable',
  host: boolean,
  splitter: boolean,
  dealer: boolean,
  announcer: boolean,
  starter: boolean,
  announceOffer: 'None' | 'Pass' | 'Clubs' | 'Diamonds' | 'Hearts' | 'Spades' | 'NoTrumps' | 'AllTrumps',
  hand: Array<Card>,
}