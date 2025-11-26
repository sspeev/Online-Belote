import type { Player } from "@/types/models/Player";
import type { Lobby } from '@/types/models/Lobby.ts'

export type PlayerAction =
  | { type: 'SET_PLAYER'; payload: Player }
  | { type: 'SET_LOBBY_NAME'; payload: string }
  | { type: 'SET_AVAILABLE_LOBBIES'; lobbies: Array<Lobby> ; }
  | { type: 'SET_SELECTED_LOBBY_ID'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; message: string | null; }