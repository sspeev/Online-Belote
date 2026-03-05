import type { Game } from '@/types/models/Game'
import type { Lobby } from '@/types/models/Lobby'
import type { Team } from '@/types/models/Team'

export type LobbyAction =
  | { type: 'SET_ERROR'; message: string }
  | { type: 'SET_LOBBY'; lobby: Lobby }
  | { type: 'UPDATE_GAME'; game: Game }
  | { type: 'SET_GAME_PHASE'; phase: Lobby['gamePhase'] }
  | { type: 'SHOW_ROUND_RESULT'; teams: Team[] }
  | { type: 'HIDE_ROUND_RESULT' }
  | { type: 'RESET' }
