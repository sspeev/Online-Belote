import type { Team } from '@/types/models/Team.ts'

export type Game = {
  teams: Array<Team>,
  currentAnnounce: 'hearts' | 'diamonds' | 'clubs' | 'spades' | 'No trump' | 'All trump' | null

}