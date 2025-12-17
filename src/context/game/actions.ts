import type { Team } from '@/types/models/Team.ts'
import type { Player } from '@/types/models/Player.ts'

export type GameAction =
  | { type: 'SET_TEAM'; team: Team }
  | { type: 'SET_CURRENT_PLAYER'; currentPlayer: Player }
  | {
      type: 'SET_CURRENT_ANNOUNCE'
      currentAnnounce:
        | 'hearts'
        | 'diamonds'
        | 'clubs'
        | 'spades'
        | 'No trump'
        | 'All trump'
        | 'pass'
    }
  | { type: 'SET_PASS_COUNTER'; passCounter: number }
  | { type: 'SET_ERROR'; message: string | null }
  | { type: 'RESET' }
