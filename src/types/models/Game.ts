import type { Team } from '@/types/models/Team.ts'
import type { Player } from '@/types/models/Player.ts'

export type Game = {
  teams: Array<Team>,
  currentAnnounce: 'hearts' | 'diamonds' | 'clubs' | 'spades' | 'No trump' | 'All trump' | 'pass'
  currentPlayer: Player | null
  passCounter: number
}