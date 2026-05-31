import { describe, it, expect } from 'vitest'
import { lobbyReducer } from '@/context/lobby/reducer'
import { defaultLobby } from '@/context/lobby/context'
import type { LobbyContextValue } from '@/context/lobby/types'
import Announces from '@/types/enums/Announces'

describe('lobbyReducer', () => {
  it('should handle SET_GAME_PHASE', () => {
    const initialState: LobbyContextValue = { ...defaultLobby }

    const newState = lobbyReducer(initialState, {
      type: 'SET_GAME_PHASE',
      phase: 'dealing',
    })

    expect(newState.lobbyData.lobby.gamePhase).toBe('dealing')
  })

  it('should handle SET_LOBBY (full lobby payload)', () => {
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
      },
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const action = { type: 'SET_LOBBY' as const, lobby: mockLobby as any }

    const newState = lobbyReducer(initialState, action)

    expect(newState.lobbyData.lobby.id).toBe(99)
    expect(newState.lobbyData.game.passCounter).toBe(2)
  })

  it('SET_LOBBY should support partial game patches and preserve currentPlayer', () => {
    const initialState: LobbyContextValue = {
      ...defaultLobby,
      lobbyData: {
        ...defaultLobby.lobbyData,
        game: {
          ...defaultLobby.lobbyData.game,
          currentPlayer: {
            name: 'Alice',
            lobbyId: 1,
            status: 'Connected',
            hoster: false,
            announceOffer: Announces.None,
            hand: [],
          },
          passCounter: 0,
        },
      },
    }

    const newState = lobbyReducer(initialState, {
      type: 'SET_LOBBY',
      lobby: {
        game: {
          passCounter: 7,
        },
      } as any,
    })

    expect(newState.lobbyData.game.passCounter).toBe(7)
    expect(newState.lobbyData.game.currentPlayer.name).toBe('Alice')
  })

  it('SET_LOBBY should not overwrite currentPlayer with an empty payload', () => {
    const initialState: LobbyContextValue = {
      ...defaultLobby,
      lobbyData: {
        ...defaultLobby.lobbyData,
        game: {
          ...defaultLobby.lobbyData.game,
          currentPlayer: {
            name: 'Alice',
            lobbyId: 1,
            status: 'Connected',
            hoster: false,
            announceOffer: Announces.None,
            hand: [],
          },
        },
      },
    }

    const newState = lobbyReducer(initialState, {
      type: 'SET_LOBBY',
      lobby: {
        game: {
          // empty name => should be treated as "no update"
          currentPlayer: { name: '' } as any,
        },
      } as any,
    })

    expect(newState.lobbyData.game.currentPlayer.name).toBe('Alice')
  })

  it('SET_LOBBY should switch currentPlayer identity using sortedPlayers lookup', () => {
    const initialState: LobbyContextValue = {
      ...defaultLobby,
      lobbyData: {
        ...defaultLobby.lobbyData,
        game: {
          ...defaultLobby.lobbyData.game,
          sortedPlayers: [
            {
              name: 'Alice',
              lobbyId: 1,
              status: 'Connected',
              hoster: false,
              announceOffer: Announces.None,
              hand: [],
            },
            {
              name: 'Bob',
              lobbyId: 1,
              status: 'Connected',
              hoster: true,
              announceOffer: Announces.None,
              hand: [],
            },
          ],
          currentPlayer: {
            name: 'Alice',
            lobbyId: 1,
            status: 'Connected',
            hoster: false,
            announceOffer: Announces.None,
            hand: [],
          },
        },
      },
    }

    const newState = lobbyReducer(initialState, {
      type: 'SET_LOBBY',
      lobby: {
        game: {
          currentPlayer: { name: 'Bob' } as any,
        },
      } as any,
    })

    expect(newState.lobbyData.game.currentPlayer.name).toBe('Bob')
    expect(newState.lobbyData.game.currentPlayer.hoster).toBe(true)
  })
})