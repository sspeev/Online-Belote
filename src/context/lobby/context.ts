import { createContext } from 'react'
import type { LobbyContextValue } from './types'
import Announces from '@/types/enums/Announces'

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
        currentAnnounce: Announces.Pass,
        currentPlayer: {
          name: '',
          lobbyId: 0,
          status: 'Disconnected',
          hoster: false,
          announceOffer: 'None',
          hand: [],
        },
        passCounter: 0
    },
    error: null,
  },
  dispatchLobby: () => {},
}

export const LobbyContext = createContext<LobbyContextValue>(defaultLobby)
