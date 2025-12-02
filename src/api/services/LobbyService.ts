// types
import type { Player } from '@/types/models/Player.ts'
import type { Lobby } from '@/types/models/Lobby.ts'
import type { Dispatch } from 'react'
import type { LobbyAction } from '@/context/lobby/actions.ts'
import type { PlayerState } from '@/context/player/types.ts'
import type { PlayerAction } from '@/context/player/actions.ts'
import type { LobbyState } from '@/context/lobby/types.ts'

// api endpoints
import { find, leave, join, all, create } from '@/api/Lobby/endpoints'
import Error from '@/app/components/common/Error.tsx'

export const findLobby: (
  dispatchLobby: Dispatch<LobbyAction>,
  playerData: PlayerState,
) => Promise<void> = async (
  dispatchLobby: Dispatch<LobbyAction>,
  playerData: PlayerState,
): Promise<void> => {
  const response = await find(playerData.player.lobbyId)

  if (!response.data) throw Error('Failed to fetch lobby')
  dispatchLobby({ type: 'SET_LOBBY', lobby: response.data.lobby })
}

export const leaveLobby: (
  playerData: PlayerState,
  dispatchPlayer: Dispatch<PlayerAction>,
  lobbyData: LobbyState,
  dispatchLobby: Dispatch<LobbyAction>,
) => Promise<void> = async (
  playerData: PlayerState,
  dispatchPlayer: Dispatch<PlayerAction>,
  lobbyData: LobbyState,
  dispatchLobby: Dispatch<LobbyAction>,
): Promise<void> => {
  const response = await leave({
    playerName: playerData.player.name,
    lobbyId: playerData.player.lobbyId,
  })

  if (response.status !== 200) {
    dispatchPlayer({
      type: 'SET_ERROR',
      message: 'Failed to join lobby',
    })
    throw Error('Failed to leave lobby')
  }

  const updatedPlayer: Player = {
    ...playerData.player,
    lobbyId: 0,
    host: false,
    status: 'Disconnected',
    lastSpitter: false,
  }
  dispatchPlayer({ type: 'SET_PLAYER', payload: updatedPlayer })
  dispatchPlayer({ type: 'SET_SELECTED_LOBBY_ID', payload: 0 })

  if (response.data.isHostHere) {
    const updatedLobby: Lobby = {
      ...lobbyData.lobby,
      connectedPlayers: lobbyData.lobby.connectedPlayers.filter(
        (p: Player) => p.name !== playerData.player.name,
      ),
    }
    dispatchLobby({ type: 'SET_LOBBY', lobby: updatedLobby })
  } else dispatchLobby({ type: 'RESET' })
}

export const joinLobby: (
  playerData: PlayerState,
  dispatchPlayer: Dispatch<PlayerAction>,
) => Promise<number> = async (
  playerData: PlayerState,
  dispatchPlayer: Dispatch<PlayerAction>,
): Promise<number> => {

  const response = await join({
    playerName: playerData.player.name,
    LobbyId: playerData.selectedLobbyId,
  })

  if (!response.data) {
    dispatchPlayer({
      type: 'SET_ERROR',
      message: 'Failed to join lobby',
    })
    throw Error('Failed to join lobby')
  }
  const lobbyId: number = response.data.lobby?.id

  const updatedPlayer: Player = {
    ...playerData.player,
    lobbyId: lobbyId,
    host: false,
    status: 'Connected',
  }
  dispatchPlayer({ type: 'SET_PLAYER', payload: updatedPlayer })

  return lobbyId
}

export const allLobbies: (
  dispatchPlayer: Dispatch<PlayerAction>,
) => Promise<void> = async (
  dispatchPlayer: Dispatch<PlayerAction>,
): Promise<void> => {
  const response = await all()
  if (!response.data) {
    dispatchPlayer({
      type: 'SET_ERROR',
      message: 'Failed to fetch lobbies',
    })
    throw Error('Failed to join lobbies')
  }
  dispatchPlayer({
    type: 'SET_AVAILABLE_LOBBIES',
    lobbies: response.data.lobbies,
  })
}

export const createLobby: (
  playerData: PlayerState,
  dispatchPlayer: Dispatch<PlayerAction>,
) => Promise<number> = async (
  playerData: PlayerState,
  dispatchPlayer: Dispatch<PlayerAction>,
): Promise<number> => {

  const response = await create({
    playerName: playerData.player.name,
    lobbyName: playerData.lobbyName,
  })
  if (!response.data) throw Error('Failed to create lobby')

  const selectedLobbyId: number = response.data.lobby.id

  const updatedPlayer: Player = {
    ...playerData.player,
    lobbyId: selectedLobbyId,
    status: 'Connected',
    host: true,
  }
  dispatchPlayer({ type: 'SET_PLAYER', payload: updatedPlayer })

  return selectedLobbyId
}
