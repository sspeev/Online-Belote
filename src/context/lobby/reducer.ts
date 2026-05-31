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
      const updatedLobby = restOfLobby && Object.keys(restOfLobby).length > 0
        ? { ...state.lobbyData.lobby, ...restOfLobby }
        : state.lobbyData.lobby
        
      let updatedGame = state.lobbyData.game
      if (game) {
        updatedGame = {
          ...state.lobbyData.game,
          ...game,
        }

        // Special logic for currentPlayer to support partial game patches and lookup in sortedPlayers
        if (game.currentPlayer) {
          const currentPlayerName = game.currentPlayer.name
          if (!currentPlayerName || currentPlayerName.trim() === '') {
            // Keep the previous currentPlayer if the name is empty
            updatedGame.currentPlayer = state.lobbyData.game.currentPlayer
          } else {
            const sortedPlayersList = game.sortedPlayers ?? state.lobbyData.game.sortedPlayers
            const fullPlayer = sortedPlayersList.find((p) => p.name === currentPlayerName)
            if (fullPlayer) {
              updatedGame.currentPlayer = fullPlayer
            } else {
              updatedGame.currentPlayer = {
                ...state.lobbyData.game.currentPlayer,
                ...game.currentPlayer,
              }
            }
          }
        }
      }

      const res = {
        ...state,
        lobbyData: {
          ...state.lobbyData,
          lobby: updatedLobby,
          game: updatedGame,
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
