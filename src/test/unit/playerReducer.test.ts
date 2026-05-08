import { describe, it, expect, beforeEach } from 'vitest'
import { playerReducer } from '@/context/player/reducer'
import { defaultState } from '@/context/player/context'
import type { PlayerContextValue } from '@/context/player/types'
import Announces from '@/types/enums/Announces'
import type { Player } from '@/types/models/Player'

describe('playerReducer', () => {
  beforeEach(() => {
    // Clear localStorage before each test since the reducer interacts with it
    localStorage.clear()
  })

  it('should handle SET_PLAYER and update localStorage', () => {
    const initialState: PlayerContextValue = { ...defaultState }
    const newPlayer: Player = {
      lobbyId: 1,
      name: 'Stoyan',
      status: 'Connected',
      hoster: true,
      announceOffer: Announces.None,
      hand: [],
    }
    
    const newState = playerReducer(initialState, { 
      type: 'SET_PLAYER', 
      payload: newPlayer 
    })
    
    expect(newState.playerData.player.name).toBe('Stoyan')
    expect(localStorage.getItem('playerName')).toBe('Stoyan')
  })

  it('should handle SET_ERROR', () => {
    const initialState: PlayerContextValue = { ...defaultState }
    
    const newState = playerReducer(initialState, { 
      type: 'SET_ERROR', 
      message: 'Failed to join' 
    })
    
    expect(newState.playerData.error).toBe('Failed to join')
  })
  it('should handle SET_LOBBY_NAME', () => {
    const initialState: PlayerContextValue = { ...defaultState }
    
    const newState = playerReducer(initialState, { 
      type: 'SET_LOBBY_NAME', 
      payload: 'Cool Lobby' 
    })
    
    expect(newState.playerData.lobbyName).toBe('Cool Lobby')
  })

  it('should handle SET_SELECTED_LOBBY_ID', () => {
    const initialState: PlayerContextValue = { ...defaultState }
    
    const newState = playerReducer(initialState, { 
      type: 'SET_SELECTED_LOBBY_ID', 
      payload: 42 
    })
    
    expect(newState.playerData.selectedLobbyId).toBe(42)
  })

  it('should handle SET_AVAILABLE_LOBBIES', () => {
    const initialState: PlayerContextValue = { ...defaultState }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockLobbies = [{ id: 1, name: 'Lobby 1' }] as any
    
    const newState = playerReducer(initialState, { 
      type: 'SET_AVAILABLE_LOBBIES', 
      lobbies: mockLobbies 
    })
    
    expect(newState.playerData.availableLobbies).toEqual(mockLobbies)
  })
})