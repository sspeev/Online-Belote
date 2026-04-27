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
          game: action.game ?? state.lobbyData.game ?? defaultLobby.lobbyData.game,
        },
      }

    case 'SET_LOBBY': {
      const { game, ...restOfLobby } = action.lobby
      return {
        ...state,
        lobbyData: {
          ...state.lobbyData,
          lobby: restOfLobby,
          game: game ?? state.lobbyData.game ?? defaultLobby.lobbyData.game,
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
    case 'SHOW_ROUND_RESULT':
      return {
        ...state,
        lobbyData: {
          ...state.lobbyData,
          roundResultTeams: action.teams,
        },
      }

    case 'HIDE_ROUND_RESULT':
      return {
        ...state,
        lobbyData: {
          ...state.lobbyData,
          roundResultTeams: null,
        },
      }

    case 'RESET':
      return { ...defaultLobby }
    default:
      return state
  }
}
