export type Card = {
    id: number;
    suit: 'hearts' | 'diamonds' | 'clubs' | 'spades' | string;
    rank: '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A' | string;
    value: number;
    power: number;
}