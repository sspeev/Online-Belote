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
        announceOffer: Announces.None,
        hand: [],
      },
      passCounter: 0,
      currentTrick: { playedCards: [], isComplete: false },
    },
    error: null,
    roundResultTeams: null,
  },
  dispatchLobby: () => {},
  roundCountdown: null,
}

export const LobbyContext = createContext<LobbyContextValue>(defaultLobby)
