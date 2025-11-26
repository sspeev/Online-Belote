import type { Dispatch } from 'react'
import type { PlayerAction } from './actions'

//types
import type { Player } from '@/types/models/Player'
import type { Lobby } from '@/types/models/Lobby.ts'

export type PlayerState = {
  player: Player
  lobbyName: string
  selectedLobbyId: number
  availableLobbies: Array<Lobby>
  loading: boolean
  error: null | string
}

export type PlayerContextValue = {
  playerData: PlayerState
  dispatchPlayer: Dispatch<PlayerAction>
}
