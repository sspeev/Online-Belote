import type { Player } from '@/types/models/Player.ts'

export type Team = {
  id: number
  players: Array<Player>
  score: number
}