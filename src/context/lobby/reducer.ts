import type { LobbyAction } from './actions'
import { type LobbyContextValue } from './types'
import { defaultLobby } from '@/context/lobby/context.ts'

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
    case 'RESET':
      return {...defaultLobby}
    default:
      return state
  }
}
