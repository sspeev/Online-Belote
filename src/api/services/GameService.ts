import type { LobbyState } from '@/context/lobby/types.ts'
import type { Dispatch } from 'react'
import type { PlayerAction } from '@/context/player/actions.ts'



export const startGame = async (
  invoke: <T = any>(methodName: string, ...args: any[]) => Promise<T>,
  lobbyData: LobbyState,
  dispatchPlayer: Dispatch<PlayerAction>
): Promise<void> => {
  try {
    await invoke<void>('StartGame', lobbyData.lobby.id)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to start game'
    dispatchPlayer({ type: 'SET_ERROR', message: errorMessage })
    throw error
  }
}