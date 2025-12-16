import type { PlayerAction } from './actions'
import { type PlayerContextValue } from './types'

export const playerReducer = (
  state: PlayerContextValue,
  action: PlayerAction,
): PlayerContextValue => {
  switch (action.type) {
    case 'SET_PLAYER':
      return {
        ...state,
        playerData: {
          ...state.playerData,
          player: action.payload,
        },
      }
    case 'SET_LOBBY_NAME':
      return {
        ...state,
        playerData: {
          ...state.playerData,
          lobbyName: action.payload,
        },
      }
    case 'SET_SELECTED_LOBBY_ID':
      return {
        ...state,
        playerData: {
          ...state.playerData,
          selectedLobbyId: action.payload,
        },
      }
    case 'SET_AVAILABLE_LOBBIES':
      return {
        ...state,
        playerData: {
          ...state.playerData,
          availableLobbies: action.lobbies,
        },
      }
    case 'SET_HAND':
    return {
      ...state,
      playerData: {
        ...state.playerData,
        hand: action.hand,
      },
    }
    case 'SET_LOADING':
      return {
        ...state,
        playerData: {
          ...state.playerData,
          loading: action.payload,
        },
      }
    case 'SET_ERROR':
      return {
        ...state,
        playerData: {
          ...state.playerData,
          error: action.message,
        }
      };
    default:
      return state
  }
}
