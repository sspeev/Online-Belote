import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import JoinForm from '@/app/components/pages/joinPage/Join'
import * as playerHooks from '@/hooks/player/usePlayer'
import * as signalRHooks from '@/hooks/common/useSignalR'
import * as lobbyService from '@/api/services/LobbyService'
import * as sessionEndpoints from '@/api/session/endpoints'

const mockNavigate = vi.fn()
vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
}))

vi.mock('@/hooks/player/usePlayer')
vi.mock('@/hooks/common/useSignalR')
vi.mock('@/api/services/LobbyService')
vi.mock('@/api/session/endpoints')

describe('JoinForm Component', () => {
  const mockDispatchPlayer = vi.fn()
  const mockInvoke = vi.fn()
  const mockConnect = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(playerHooks.usePlayer).mockReturnValue({
      playerData: {
        player: {
          name: 'TestPlayer',
          hoster: false,
          status: 'Idle',
          lobbyId: null,
          position: null,
          connectionId: '',
        },
        lobbyName: '',
        availableLobbies: [
          { id: 101, name: 'Lobby A', playerCount: 2, gamePhase: 'waiting' },
          { id: 102, name: 'Full Lobby', playerCount: 4, gamePhase: 'playing' },
        ],
        error: null,
      },
      dispatchPlayer: mockDispatchPlayer,
    } as any)

    vi.mocked(signalRHooks.useSignalR).mockReturnValue({
      invoke: mockInvoke,
      connect: mockConnect,
    } as any)

    vi.mocked(lobbyService.allLobbies).mockResolvedValue()
    vi.mocked(sessionEndpoints.setCookie).mockResolvedValue('cookie-set')
  })

  it('joins an available lobby and navigates', async () => {
    render(<JoinForm />)

    // Wait for the lobbies to be rendered
    const joinButtons = await screen.findAllByRole('button', { name: /join/i })

    // The first one should be 'Join' for Lobby A, the second one 'Full'
    const joinButton = joinButtons[0]

    fireEvent.click(joinButton)

    await waitFor(() => {
      expect(mockConnect).toHaveBeenCalledWith(101)
      expect(mockInvoke).toHaveBeenCalledWith('JoinLobby', {
        playerName: 'TestPlayer',
        lobbyId: 101,
        lobbyName: 'Lobby A',
      })
      expect(mockNavigate).toHaveBeenCalledWith({
        to: '/lobby/$lobbyId/waiting',
        params: { lobbyId: '101' },
      })
    })
  })
})
