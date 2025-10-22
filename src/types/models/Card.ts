export type Card = {
    suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
    rank: '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
    points: number;
}