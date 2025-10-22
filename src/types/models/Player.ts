import type { Card } from "./Card";

export type Player = {
    lobbyId: number;
    name: string;
    host: boolean;
    status: 'Disconnected' | 'Connected' | 'NotStable';
    lastSpitter: boolean;
    isStarter: boolean;
    announceOffer: 'None' | 'Pass' | 'Clubs' | 'Diamonds' | 'Hearts' | 'Spades' | 'NoTrumps' | 'AllTrumps';
    hand: Array<Card>;
}