import { start } from '@/api/game/endpoints/index.ts'
import type { LobbyState } from '@/context/lobby/types.ts'
import type { Dispatch } from 'react'
import type { PlayerAction } from '@/context/player/actions.ts'


export const startGame: (
  lobbyData: LobbyState,
  dispatchPlayer: Dispatch<PlayerAction>,
) => Promise<void> = async (
  lobbyData: LobbyState,
  dispatchPlayer: Dispatch<PlayerAction>
): Promise<void> => {
  try {
    const lobbyId : number = lobbyData.lobby.id
    const responce = await start(lobbyId)

    if (responce.status !== 200) {
      throw new Error('Failed to start game')
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to start game'
    dispatchPlayer({ type: 'SET_ERROR', message: errorMessage })
    throw error
  }
}
