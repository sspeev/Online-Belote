import type { LobbyAction } from './actions'
import { type LobbyContextValue } from './types'
import { defaultLobby } from '@/context/lobby/context.ts'

export const lobbyReducer = (
  state: LobbyContextValue,
  action: LobbyAction,
): LobbyContextValue => {
  switch (action.type) {
    case 'UPDATE_GAME':
      return {
        ...state,
        lobbyData: {
          ...state.lobbyData,
          lobby: {
            ...state.lobbyData.lobby,
          },
          game: action.game,
        },
      }

    case 'SET_LOBBY': {
      const { game, ...restOfLobby } = action.lobby
      return {
        ...state,
        lobbyData: {
          ...state.lobbyData,
          lobby: restOfLobby,
          game: game,
          error: null,
        },
      }
    }

    case 'SET_GAME_PHASE':
      return {
        ...state,
        lobbyData: {
          ...state.lobbyData,
          lobby: {
            ...state.lobbyData.lobby,
            gamePhase: action.phase,
          },
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
      return { ...defaultLobby }
    default:
      return state
  }
}
