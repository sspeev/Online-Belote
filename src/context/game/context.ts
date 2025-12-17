import { createContext } from 'react'
import type { GameContextValue } from './types'

export const defaultGame: GameContextValue = {
  gameData: {
    game: {
      teams: [],
      currentAnnounce: 'pass',
      currentPlayer: null,
      passCounter: 0
    },
    error: null,
  },
  dispatchGame: () => {},
}

export const GameContext = createContext<GameContextValue>(defaultGame)
