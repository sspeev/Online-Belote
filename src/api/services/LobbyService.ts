// types
import type { Player } from '@/types/models/Player.ts'
import type { Lobby } from '@/types/models/Lobby.ts'
import type { Dispatch } from 'react'
import type { LobbyAction } from '@/context/lobby/actions.ts'
import type { PlayerState } from '@/context/player/types.ts'
import type { PlayerAction } from '@/context/player/actions.ts'
import type { LobbyState } from '@/context/lobby/types.ts'

// api endpoints
import { find, leave, join, all, create } from '@/api/Lobby/endpoints/index.ts'

export const findLobby: (
  dispatchLobby: Dispatch<LobbyAction>,
  playerData: PlayerState,
) => Promise<void> = async (
  dispatchLobby: Dispatch<LobbyAction>,
  playerData: PlayerState,
): Promise<void> => {
  try {
    const response = await find(playerData.player.lobbyId)

    if (!response.data) {
      dispatchLobby({ type: 'SET_ERROR', message: 'Failed to fetch lobby' })
      throw new Error('Failed to fetch lobby')
    }
    dispatchLobby({ type: 'SET_LOBBY', lobby: response.data.lobby })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch lobby'
    dispatchLobby({ type: 'SET_ERROR', message: errorMessage })
    throw error
  }
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
  try {
    const response = await leave({
      playerName: playerData.player.name,
      lobbyId: playerData.player.lobbyId,
    })

    if (response.status !== 200) {
      dispatchPlayer({
        type: 'SET_ERROR',
        message: 'Failed to leave lobby',
      })
      throw new Error('Failed to leave lobby')
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
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to leave lobby'
    dispatchPlayer({ type: 'SET_ERROR', message: errorMessage })
    throw error
  }
}

export const joinLobby: (
  playerData: PlayerState,
  dispatchPlayer: Dispatch<PlayerAction>,
) => Promise<number> = async (
  playerData: PlayerState,
  dispatchPlayer: Dispatch<PlayerAction>,
): Promise<number> => {
  try {
    const response = await join({
      playerName: playerData.player.name,
      LobbyId: playerData.selectedLobbyId,
    })

    if (!response.data) {
      dispatchPlayer({
        type: 'SET_ERROR',
        message: 'Failed to join lobby',
      })
      throw new Error('Failed to join lobby')
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
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to join lobby'
    dispatchPlayer({ type: 'SET_ERROR', message: errorMessage })
    throw error
  }
}

export const allLobbies: (
  dispatchPlayer: Dispatch<PlayerAction>,
) => Promise<void> = async (
  dispatchPlayer: Dispatch<PlayerAction>,
): Promise<void> => {
  try {
    const response = await all()
    if (!response.data) {
      dispatchPlayer({
        type: 'SET_ERROR',
        message: 'Failed to fetch lobbies',
      })
      throw new Error('Failed to fetch lobbies')
    }
    dispatchPlayer({
      type: 'SET_AVAILABLE_LOBBIES',
      lobbies: response.data.lobbies,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch lobbies'
    dispatchPlayer({ type: 'SET_ERROR', message: errorMessage })
    throw error
  }
}

export const createLobby: (
  playerData: PlayerState,
  dispatchPlayer: Dispatch<PlayerAction>,
) => Promise<number> = async (
  playerData: PlayerState,
  dispatchPlayer: Dispatch<PlayerAction>,
): Promise<number> => {
  try {
    const response = await create({
      playerName: playerData.player.name,
      lobbyName: playerData.lobbyName,
    })
    if (!response.data) {
      dispatchPlayer({ type: 'SET_ERROR', message: 'Failed to create lobby' })
      throw new Error('Failed to create lobby')
    }

    const selectedLobbyId: number = response.data.lobby.id

    const updatedPlayer: Player = {
      ...playerData.player,
      lobbyId: selectedLobbyId,
      status: 'Connected',
      host: true,
    }
    dispatchPlayer({ type: 'SET_PLAYER', payload: updatedPlayer })

    return selectedLobbyId
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create lobby'
    dispatchPlayer({ type: 'SET_ERROR', message: errorMessage })
    throw error
  }
}
