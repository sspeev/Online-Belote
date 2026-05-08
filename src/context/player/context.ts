import { createContext } from 'react'
import type { PlayerContextValue } from './types'
import type { Lobby } from '@/types/models/Lobby.ts'
import Announces from '@/types/enums/Announces'

export const defaultState: PlayerContextValue = {
  playerData: {
    player: {
      lobbyId: 0,
      name: localStorage.getItem('playerName') || '',
      status: 'Disconnected',
      hoster: false,
      announceOffer: Announces.None,
      hand: [],
    },
    lobbyName: '',
    selectedLobbyId: 0,
    availableLobbies: Array<Lobby>(),
    error: null,
  },
  dispatchPlayer: () => {},
}

export const PlayerContext = createContext<PlayerContextValue>(defaultState)
