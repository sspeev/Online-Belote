import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import BiddingPanel from '@/app/components/pages/boardPage/components/BiddingPanel'
import * as lobbyHooks from '@/hooks/lobby/useLobby'
import * as playerHooks from '@/hooks/player/usePlayer'
import * as signalRHooks from '@/hooks/common/useSignalR'
import Announces from '@/types/enums/Announces'

vi.mock('@/hooks/lobby/useLobby')
vi.mock('@/hooks/player/usePlayer')
vi.mock('@/hooks/common/useSignalR')
vi.mock('@/hooks/common/useIsMobile', () => ({
  useIsMobile: () => false,
}))

describe('BiddingPanel Component', () => {
  const mockInvoke = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(lobbyHooks.useLobby).mockReturnValue({
      lobbyData: {
        lobby: { id: 1, gamePhase: 'bidding' },
        game: {
          currentAnnounce: Announces.None,
          passCounter: 0,
          isDoubled: false,
          isReDoubled: false,
          contractPlayer: null,
          teams: [
            { players: [{ name: 'TestPlayer' }, { name: 'Teammate' }] },
            { players: [{ name: 'Opponent1' }, { name: 'Opponent2' }] },
          ],
        },
      },
    } as any)

    vi.mocked(playerHooks.usePlayer).mockReturnValue({
      playerData: {
        player: { name: 'TestPlayer', announceOffer: Announces.None },
      },
    } as any)

    vi.mocked(signalRHooks.useSignalR).mockReturnValue({
      invoke: mockInvoke,
    } as any)
  })

  it('renders null if not bidding phase', () => {
    vi.mocked(lobbyHooks.useLobby).mockReturnValue({
      lobbyData: { lobby: { gamePhase: 'playing' }, game: {} },
    } as any)

    const { container } = render(<BiddingPanel isMyTurn={true} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders null if not my turn', () => {
    const { container } = render(<BiddingPanel isMyTurn={false} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders bid buttons and allows bidding', async () => {
    render(<BiddingPanel isMyTurn={true} />)

    const clubsButton = screen.getByRole('button', { name: /clubs/i })
    expect(clubsButton).toBeDefined()
    expect((clubsButton as HTMLButtonElement).disabled).toBe(false)

    fireEvent.click(clubsButton)

    await waitFor(() => {
      expect(mockInvoke).toHaveBeenCalledWith(
        'MakeBid',
        1,
        'TestPlayer',
        'Clubs',
      )
    })
  })

  it('disables lower bids than current announce', () => {
    vi.mocked(lobbyHooks.useLobby).mockReturnValue({
      lobbyData: {
        lobby: { id: 1, gamePhase: 'bidding' },
        game: {
          currentAnnounce: Announces.Hearts,
          passCounter: 0,
        },
      },
    } as any)

    render(<BiddingPanel isMyTurn={true} />)

    const clubsButton = screen.getByRole('button', { name: /clubs/i })
    expect((clubsButton as HTMLButtonElement).disabled).toBe(true)

    const spadesButton = screen.getByRole('button', { name: /spades/i })
    expect((spadesButton as HTMLButtonElement).disabled).toBe(false)
  })
})
