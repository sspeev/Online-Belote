import { createContext } from 'react'
import type { LobbyContextValue } from './types'

export const defaultLobby: LobbyContextValue = {
  lobbyData: {
    lobby: {
      id: 0,
      name: '',
      connectedPlayers: [],
      gamePhase: 'Waiting',
      gameStarted: false,
      playerCount: 0,
      game: {
        teams: [],
        currentAnnounce: null,
        currentPlayer: null
      }
    },
    error: null,
  },
  dispatchLobby: () => {},
}

export const LobbyContext = createContext<LobbyContextValue>(defaultLobby)
