import { describe, it, expect } from 'vitest'
import { lobbyReducer } from '@/context/lobby/reducer'
import { defaultLobby } from '@/context/lobby/context'
import type { LobbyContextValue } from '@/context/lobby/types'

describe('lobbyReducer', () => {


  it('should handle SET_GAME_PHASE', () => {
    const initialState: LobbyContextValue = { ...defaultLobby }
    
    const newState = lobbyReducer(initialState, { 
      type: 'SET_GAME_PHASE', 
      phase: 'dealing' 
    })
    
    expect(newState.lobbyData.lobby.gamePhase).toBe('dealing')
  })
  it('should handle UPDATE_GAME', () => {
    const initialState: LobbyContextValue = { ...defaultLobby }
    const mockGame = {
      ...defaultLobby.lobbyData.game,
      passCounter: 5,
    }
    const action = { type: 'UPDATE_GAME' as const, game: mockGame }
    
    const newState = lobbyReducer(initialState, action)
    
    expect(newState.lobbyData.game.passCounter).toBe(5)
  })

  it('should handle SET_LOBBY', () => {
    const initialState: LobbyContextValue = { ...defaultLobby }
    const mockLobby = {
      id: 99,
      name: 'Test',
      connectedPlayers: [],
      gamePhase: 'waiting' as const,
      gameStarted: false,
      playerCount: 1,
      game: {
        ...defaultLobby.lobbyData.game,
        passCounter: 2,
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const action = { type: 'SET_LOBBY' as const, lobby: mockLobby as any }
    
    const newState = lobbyReducer(initialState, action)
    
    expect(newState.lobbyData.lobby.id).toBe(99)
    expect(newState.lobbyData.game.passCounter).toBe(2)
  })

})