import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Waiting from '@/app/components/pages/waitingPage/Waiting'
import * as lobbyHooks from '@/hooks/lobby/useLobby'
import * as playerHooks from '@/hooks/player/usePlayer'
import * as signalRHooks from '@/hooks/common/useSignalR'
import * as rejoinHooks from '@/hooks/lobby/useLobbyRejoin'
import * as lobbyService from '@/api/services/LobbyService'

const mockNavigate = vi.fn()
vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({ lobbyId: '1' }),
}))

vi.mock('@/hooks/lobby/useLobby')
vi.mock('@/hooks/player/usePlayer')
vi.mock('@/hooks/common/useSignalR')
vi.mock('@/hooks/lobby/useLobbyRejoin')
vi.mock('@/api/services/LobbyService')

describe('Waiting Page Component', () => {
  const mockDispatchLobby = vi.fn()
  const mockDispatchPlayer = vi.fn()
  const mockInvoke = vi.fn()
  const mockOn = vi.fn()
  const mockOff = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(lobbyHooks.useLobby).mockReturnValue({
      lobbyData: {
        lobby: {
          id: 1,
          name: 'Test Lobby',
          playerCount: 3,
          gamePhase: 'waiting',
          connectedPlayers: [
            { name: 'HostPlayer', hoster: true },
            { name: 'Player2', hoster: false },
            { name: 'Player3', hoster: false },
          ],
        },
        game: null,
      },
      dispatchLobby: mockDispatchLobby,
    } as any)

    vi.mocked(playerHooks.usePlayer).mockReturnValue({
      playerData: {
        player: { name: 'HostPlayer', hoster: true, lobbyId: 1 },
        lobbyName: 'Test Lobby',
      },
      dispatchPlayer: mockDispatchPlayer,
    } as any)

    vi.mocked(signalRHooks.useSignalR).mockReturnValue({
      invoke: mockInvoke,
      on: mockOn,
      off: mockOff,
    } as any)

    vi.mocked(rejoinHooks.useLobbyRejoin).mockImplementation(() => {})
    vi.mocked(lobbyService.findLobby).mockResolvedValue()
  })

  it('renders players and empty slots correctly', async () => {
    render(<Waiting />)

    // Wait for the components to be rendered
    const playerBoxes = await screen.findAllByText(
      /HostPlayer|Player2|Player3/i,
    )
    expect(playerBoxes.length).toBe(3)

    const emptySlots = await screen.findAllByText(/Waiting\.\.\./i)
    expect(emptySlots.length).toBe(1) // 4 max - 3 connected
  })

  it('shows Start Game button for host and handles click', async () => {
    // Make it 4 players so the Start Game button is enabled
    vi.mocked(lobbyHooks.useLobby).mockReturnValue({
      lobbyData: {
        lobby: {
          id: 1,
          name: 'Test Lobby',
          playerCount: 4,
          gamePhase: 'waiting',
          connectedPlayers: [
            { name: 'HostPlayer', hoster: true },
            { name: 'Player2', hoster: false },
            { name: 'Player3', hoster: false },
            { name: 'Player4', hoster: false },
          ],
        },
        game: null,
      },
      dispatchLobby: mockDispatchLobby,
    } as any)

    render(<Waiting />)

    const startButton = await screen.findByRole('button', {
      name: /start game/i,
    })
    expect(startButton).toBeDefined()
    expect((startButton as HTMLButtonElement).disabled).toBe(false)

    fireEvent.click(startButton)

    await waitFor(() => {
      expect(mockInvoke).toHaveBeenCalledWith('StartGame', 1)
    })
  })
})
