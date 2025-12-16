// src/context/signalr/actions. ts
//import type { Card } from '@/types/models/Card.ts'
import type { Team } from '@/types/models/Team.ts'

export type GameAction =
  | { type: 'SET_TEAM'; team: Team }
  //| { type: 'SET_CARD'; card: Card }
  | {
      type: 'SET_CURRENT_ANNOUNCE'
      currentAnnounce:
        | 'hearts'
        | 'diamonds'
        | 'clubs'
        | 'spades'
        | 'No trump'
        | 'All trump'
        | null
    }
  | { type: 'SET_ERROR'; message: string | null }
  | { type: 'RESET' }
