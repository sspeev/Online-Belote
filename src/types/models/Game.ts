import type { Team } from '@/types/models/Team.ts'
import type { Player } from '@/types/models/Player.ts'
import type Announces from '@/types/enums/Announces.ts'

export type Game = {
  teams: Array<Team>
  sortedPlayers: Array<Player>
  currentAnnounce: Announces
  currentPlayer: Player | null
  passCounter: number
}
