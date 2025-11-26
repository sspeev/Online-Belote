import type { LobbyAction } from './actions'
import { type LobbyState } from './types'

export const lobbyReducer = (
  state: LobbyState,
  action: LobbyAction,
): LobbyState => {
  switch (action.type) {
    case 'SET_LOBBY':
      return {
        ...state,
        lobby: action.lobby,
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.message,
      }
    default:
      return state
  }
}
