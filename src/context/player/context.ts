import { createContext } from 'react'
import type { PlayerContextValue } from './types'
import type { Lobby } from '@/types/models/Lobby.ts'

export const defaultState: PlayerContextValue = {
  playerData: {
    player: {
      lobbyId: 0,
      name: '',
      host: false,
      status: 'Disconnected',
      lastSpitter: false,
      isStarter: false,
      announceOffer: 'None',
      hand: [],
    },
    lobbyName: '',
    selectedLobbyId: 0,
    availableLobbies: Array<Lobby>(),
    loading: false,
    error: null,
  },
  dispatchPlayer: () => {},
}

export const PlayerContext = createContext<PlayerContextValue>(defaultState)
