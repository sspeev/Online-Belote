import type { Dispatch } from 'react'
import type { LobbyAction } from './actions'
import type { Team } from '@/types/models/Team'

//types
import type { Lobby } from '@/types/models/Lobby'
import type { Game } from '@/types/models/Game'

export type LobbyState = {
  lobby: Omit<Lobby, 'game'>
  game: Game
  error: null | string
  roundResultTeams: Team[] | null
}

export type LobbyContextValue = {
  lobbyData: LobbyState
  dispatchLobby: Dispatch<LobbyAction>
  roundCountdown: number | null
}
