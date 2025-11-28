// hooks
import { usePlayer } from '@/hooks/usePlayer.ts'
import { useLobby } from '@/hooks/useLobby.ts'

// types
import type { Player } from '@/types/models/Player.ts'
import type { Lobby } from '@/types/models/Lobby.ts'

// api endpoints
import { find, leave, join, all, create } from '@/api/lobby/endpoints'
import Error from '@/app/components/common/Error.tsx'

const { playerData, dispatchPlayer } = usePlayer()
const {
  lobbyData: { lobby },
  dispatchLobby,
} = useLobby()

export const findLobby: () => Promise<void> = async (): Promise<void> => {
  const response = await find(playerData.player.lobbyId)

  if (!response.data) throw Error('Failed to fetch lobby')
  dispatchLobby({ type: 'SET_LOBBY', lobby: response.data.lobby })
}

export const leaveLobby: () => Promise<void> = async (): Promise<void> => {
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
      ...lobby,
      connectedPlayers: lobby.connectedPlayers.filter(
        (p: Player) => p.name !== playerData.player.name,
      ),
    }
    dispatchLobby({ type: 'SET_LOBBY', lobby: updatedLobby })
  } else dispatchLobby({ type: 'RESET' })
}

export const joinLobby: () => Promise<number> = async (): Promise<number> => {
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

export const allLobbies: () => Promise<void> = async (): Promise<void> => {
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

export const createLobby: () => Promise<number> = async (): Promise<number> => {
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

  return selectedLobbyId;
}
