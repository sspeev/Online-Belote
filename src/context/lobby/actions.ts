import type { Game } from '@/types/models/Game'
import type { Lobby } from '@/types/models/Lobby'

export type LobbyAction =
  | { type: 'SET_ERROR'; message: string }
  | { type: 'SET_LOBBY'; lobby: Lobby }
  | { type: 'UPDATE_GAME'; game: Game }
  | { type: 'SET_GAME_PHASE'; phase: Lobby['gamePhase'] }
  | { type: 'RESET' }
