import type Suit from "../enums/Suit";

export type Card = {
    id: number;
    suit: Suit;
    rank: '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A' | string;
    value: number;
    power: number;
}