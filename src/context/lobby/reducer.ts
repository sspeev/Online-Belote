import type { LobbyAction } from './actions'
import { type LobbyContextValue } from './types'
import { defaultLobby } from '@/context/lobby/context.ts'

export const lobbyReducer = (
  state: LobbyContextValue,
  action: LobbyAction,
): LobbyContextValue => {
  switch (action.type) {
    case 'SET_LOBBY': {
      const { game, ...restOfLobby } = action.lobby
      const res = {
        ...state,
        lobbyData: {
          ...state.lobbyData,
          lobby: restOfLobby,
          game: game,
        },
      }
      console.log("response", res)
      return res
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

    case 'RESET':
      return { ...defaultLobby }
    default:
      return state
  }
}
