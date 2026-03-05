import type { Team } from '@/types/models/Team.ts'
import type { Player } from '@/types/models/Player.ts'
import type Announces from '@/types/enums/Announces.ts'
import type { Trick } from '@/types/models/Trick.ts'

export type Game = {
  teams: Array<Team>
  sortedPlayers: Array<Player>
  currentAnnounce: Announces
  currentPlayer: Player
  passCounter: number
  currentTrick: Trick | null
}
