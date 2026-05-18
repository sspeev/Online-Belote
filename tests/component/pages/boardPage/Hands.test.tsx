import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Hands from '@/app/components/pages/boardPage/components/Hands'
import * as lobbyHooks from '@/hooks/lobby/useLobby'
import * as playerHooks from '@/hooks/player/usePlayer'
import * as signalRHooks from '@/hooks/common/useSignalR'

vi.mock('@/hooks/useLobby')
vi.mock('@/hooks/usePlayer')
vi.mock('@/hooks/useSignalR')

vi.mock('@/app/components/pages/boardPage/components/PlayerPlate', () => ({
  PlayerPlate: ({ playerName, isCurrentPlayer, onCardClick, cards }: any) => (
    <div data-testid={`player-plate-${playerName}`}>
      {playerName}
      {isCurrentPlayer && (
        <button onClick={() => onCardClick(cards[0])}>Play Card</button>
      )}
    </div>
  ),
}))

describe('Hands Component', () => {
  const mockInvoke = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(lobbyHooks.useLobby).mockReturnValue({
      lobbyData: {
        lobby: { id: 1, gamePhase: 'playing' },
        game: {
          currentPlayer: { name: 'TestPlayer' },
          sortedPlayers: [
            {
              name: 'TestPlayer',
              hand: [{ id: 1, suit: 'Hearts', rank: 'A' }],
            },
            { name: 'Opponent1', hand: [] },
            { name: 'Teammate', hand: [] },
            { name: 'Opponent2', hand: [] },
          ],
        },
      },
    } as any)

    vi.mocked(playerHooks.usePlayer).mockReturnValue({
      playerData: {
        player: { name: 'TestPlayer' },
      },
    } as any)

    vi.mocked(signalRHooks.useSignalR).mockReturnValue({
      invoke: mockInvoke,
    } as any)
  })

  it('renders all 4 player plates correctly', () => {
    render(<Hands />)

    expect(screen.getByTestId('player-plate-TestPlayer')).toBeDefined()
    expect(screen.getByTestId('player-plate-Opponent1')).toBeDefined()
    expect(screen.getByTestId('player-plate-Teammate')).toBeDefined()
    expect(screen.getByTestId('player-plate-Opponent2')).toBeDefined()
  })

  it('calls PlayCard when clicking own card during turn', async () => {
    render(<Hands />)

    const playButton = screen.getByText('Play Card')
    fireEvent.click(playButton)

    await waitFor(() => {
      expect(mockInvoke).toHaveBeenCalledWith('PlayCard', 1, 'TestPlayer', {
        id: 1,
        suit: 'Hearts',
        rank: 'A',
      })
    })
  })
})
