import { createContext } from 'react'
import type { GameContextValue } from './types'

export const defaultGame: GameContextValue = {
  gameData: {
    game: {
      teams: [],
      currentAnnounce: null,
      currentPlayer: null
    },
    error: null,
  },
  dispatchGame: () => {},
}

export const GameContext = createContext<GameContextValue>(defaultGame)
