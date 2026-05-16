import type { PlayerAction } from './actions'
import { type PlayerContextValue } from './types'

export const playerReducer = (
  state: PlayerContextValue,
  action: PlayerAction,
): PlayerContextValue => {
  switch (action.type) {
    case 'SET_PLAYER':
      if (action.payload.name) {
        localStorage.setItem('playerName', action.payload.name)
      }
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
