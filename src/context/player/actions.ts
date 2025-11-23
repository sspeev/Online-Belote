import type { Player } from "@/types/models/Player";

export type PlayerAction =
  | { type: 'SET_PLAYER'; payload: Player }
  | { type: 'SET_LOBBY_NAME'; payload: string }
  | { type: 'SET_SELECTED_LOBBY_ID'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean };