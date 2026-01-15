import { createContext } from 'react'
import type { LobbyContextValue } from './types'

export const defaultLobby: LobbyContextValue = {
  lobbyData: {
    lobby: {
      id: 0,
      name: '',
      connectedPlayers: [],
      gamePhase: 'waiting',
      gameStarted: false,
      playerCount: 0,
    },
    game: {
      teams: [],
        sortedPlayers: [],
        currentAnnounce: "pass",
        currentPlayer: null,
        passCounter: 0
    },
    error: null,
  },
  dispatchLobby: () => {},
}

export const LobbyContext = createContext<LobbyContextValue>(defaultLobby)
