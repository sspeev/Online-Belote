import { describe, it, expect } from 'vitest'
import { lobbyReducer } from '@/context/lobby/reducer'
import { defaultLobby } from '@/context/lobby/context'
import type { LobbyContextValue } from '@/context/lobby/types'

describe('lobbyReducer', () => {
  it('should handle SET_ERROR', () => {
    const initialState: LobbyContextValue = { ...defaultLobby }
    const action = { type: 'SET_ERROR' as const, message: 'Connection failed' }
    
    const newState = lobbyReducer(initialState, action)
    
    expect(newState.lobbyData.error).toBe('Connection failed')
    // Ensure we didn't mutate other nested state incorrectly
    expect(newState.lobbyData.lobby).toEqual(initialState.lobbyData.lobby)
  })

  it('should handle RESET', () => {
    const initialState: LobbyContextValue = {
      ...defaultLobby,
      lobbyData: {
        ...defaultLobby.lobbyData,
        error: 'Old error',
      }
    }
    
    const newState = lobbyReducer(initialState, { type: 'RESET' })
    
    expect(newState.lobbyData.error).toBeNull()
  })

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

  it('should handle SHOW_ROUND_RESULT and HIDE_ROUND_RESULT', () => {
    const initialState: LobbyContextValue = { ...defaultLobby }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const showAction = { type: 'SHOW_ROUND_RESULT' as const, teams: [{ id: 1, name: 'Team A', score: 10 }] as any }
    const stateWithResult = lobbyReducer(initialState, showAction)
    expect(stateWithResult.lobbyData.roundResultTeams).toHaveLength(1)

    const hideAction = { type: 'HIDE_ROUND_RESULT' as const }
    const stateWithoutResult = lobbyReducer(stateWithResult, hideAction)
    expect(stateWithoutResult.lobbyData.roundResultTeams).toBeNull()
  })
})