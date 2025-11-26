import type { LobbyAction } from './actions'
import { type LobbyContextValue } from './types'

export const lobbyReducer = (
  state: LobbyContextValue,
  action: LobbyAction,
): LobbyContextValue => {
  switch (action.type) {
    case 'SET_LOBBY':
      return {
        ...state,
        lobbyData: {
          ...state.lobbyData,
          lobby: action.lobby,
        },
      }
    case 'SET_ERROR':
      return {
        ...state,
        lobbyData: {
          ...state.lobbyData,
          error: action.message,
        },
      }
    default:
      return state
  }
}
