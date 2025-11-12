
export type PlayerAction =
  | { type: 'SET_PLAYER_NAME'; payload: string }
  | { type: 'SET_LOBBY_NAME'; payload: string }