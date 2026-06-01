import type { Lobby } from '@/types/models/Lobby'

export type LobbyAction =
  | { type: 'SET_LOBBY'; lobby: Lobby }
  | { type: 'SET_GAME_PHASE'; phase: Lobby['gamePhase'] }
  | { type: 'RESET' }
