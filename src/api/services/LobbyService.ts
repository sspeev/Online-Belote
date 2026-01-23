// types
import type { Player } from '@/types/models/Player.ts'
import type { Dispatch } from 'react'
import type { LobbyAction } from '@/context/lobby/actions.ts'
import type { PlayerState } from '@/context/player/types.ts'
import type { PlayerAction } from '@/context/player/actions.ts'

// api endpoints
import { find, all, create } from '@/api/lobby/endpoints/index.ts'

export const findLobby: (
  dispatchLobby: Dispatch<LobbyAction>,
  playerData: PlayerState,
) => Promise<void> = async (dispatchLobby, playerData) => {
  try {
    const response = await find(playerData.player.lobbyId)
    dispatchLobby({ type: 'SET_LOBBY', lobby: response.data.lobby })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch lobby'
    dispatchLobby({ type: 'SET_ERROR', message: errorMessage })
    throw error
  }
}

export const allLobbies: (
  dispatchPlayer: Dispatch<PlayerAction>,
) => Promise<void> = async (dispatchPlayer) => {
  try {
    const response = await all()
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
) => Promise<number> = async (playerData, dispatchPlayer) => {
  try {
    const response = await create({
      playerName: playerData.player.name,
      lobbyName: playerData.lobbyName,
    })
    const selectedLobbyId: number = response.data.lobby.id

    const updatedPlayer: Player = {
      ...playerData.player,
      lobbyId: selectedLobbyId,
      status: 'Connected',
      hoster: true,
    }
    dispatchPlayer({ type: 'SET_PLAYER', payload: updatedPlayer })

    return selectedLobbyId
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create lobby'
    dispatchPlayer({ type: 'SET_ERROR', message: errorMessage })
    throw error
  }
}
