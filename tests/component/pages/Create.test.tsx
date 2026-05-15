import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CreateForm from '@/app/components/pages/createPage/Create'
import * as playerHooks from '@/hooks/usePlayer'
import * as signalRHooks from '@/hooks/useSignalR'
import * as lobbyService from '@/api/services/LobbyService'
import * as sessionEndpoints from '@/api/session/endpoints'

const mockNavigate = vi.fn()
vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
}))

vi.mock('@/hooks/usePlayer')
vi.mock('@/hooks/useSignalR')
vi.mock('@/api/services/LobbyService')
vi.mock('@/api/session/endpoints')

describe('CreateForm Component', () => {
  const mockDispatchPlayer = vi.fn()
  const mockInvoke = vi.fn()
  const mockConnect = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(playerHooks.usePlayer).mockReturnValue({
      playerData: {
        player: { name: 'TestPlayer', hoster: true, status: 'Idle', lobbyId: null, position: null, connectionId: '' },
        lobbyName: 'TestLobby',
        availableLobbies: [],
        error: null,
      },
      dispatchPlayer: mockDispatchPlayer,
    } as any)

    vi.mocked(signalRHooks.useSignalR).mockReturnValue({
      invoke: mockInvoke,
      connect: mockConnect,
    } as any)

    vi.mocked(lobbyService.createLobby).mockResolvedValue(123)
    vi.mocked(sessionEndpoints.setCookie).mockResolvedValue('cookie-set')
  })

  it('creates lobby, connects to SignalR and navigates to waiting room', async () => {
    render(<CreateForm />)

    const createButton = screen.getByRole('button', { name: /create game/i })
    
    fireEvent.click(createButton)

    await waitFor(() => {
      expect(lobbyService.createLobby).toHaveBeenCalled()
      expect(mockConnect).toHaveBeenCalledWith(123)
      expect(mockInvoke).toHaveBeenCalledWith('JoinLobby', {
        playerName: 'TestPlayer',
        lobbyId: 123,
        lobbyName: 'TestLobby',
      })
      expect(mockNavigate).toHaveBeenCalledWith({
        to: '/lobby/$lobbyId/waiting',
        params: { lobbyId: '123' },
      })
    })
  })
})
