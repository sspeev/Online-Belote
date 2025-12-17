import type { GameAction } from './actions'
import { type GameContextValue } from './types'
import { defaultGame } from '@/context/game/context.ts'

export const gameReducer = (
  state: GameContextValue,
  action: GameAction,
): GameContextValue => {
  switch (action.type) {
    case 'SET_TEAM':
      return {
        ...state,
        gameData: {
          ...state.gameData,
          game: {
            ...state.gameData.game,
            teams: {
              ...state.gameData.game.teams,
              [action.team.id]: action.team,
            },
          },
        },
      }
    case 'SET_CURRENT_ANNOUNCE':
      return {
        ...state,
        gameData: {
          ...state.gameData,
          game: {
            ...state.gameData.game,
            currentAnnounce: action.currentAnnounce,
          },
        },
      }
    case 'SET_CURRENT_PLAYER':
      return {
        ...state,
        gameData: {
          ...state.gameData,
          game: {
            ...state.gameData.game,
            currentPlayer: action.currentPlayer,
          },
        },
      }
    case 'SET_PASS_COUNTER':
      return {
        ...state,
        gameData: {
          ...state.gameData,
          game: {
            ...state.gameData.game,
            passCounter: action.passCounter
          }
        }
      }
    case 'SET_ERROR':
      return {
        ...state,
        gameData: {
          ...state.gameData,
          error: action.message,
        },
      }
    case 'RESET':
      return { ...defaultGame }
    default:
      return state
  }
}
