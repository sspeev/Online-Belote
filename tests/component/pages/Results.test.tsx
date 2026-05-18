import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Results from '@/app/components/pages/resultsPage/Results'
import * as lobbyHooks from '@/hooks/lobby/useLobby'
import * as playerHooks from '@/hooks/player/usePlayer'

const mockNavigate = vi.fn()
vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
}))

vi.mock('@/hooks/useLobby')
vi.mock('@/hooks/usePlayer')

describe('Results Page Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(lobbyHooks.useLobby).mockReturnValue({
      lobbyData: {
        lobby: { id: 1 },
        game: {
          teams: [
            {
              id: 1,
              players: [{ name: 'TestPlayer' }, { name: 'Teammate' }],
              score: 151,
            },
            {
              id: 2,
              players: [{ name: 'Opponent1' }, { name: 'Opponent2' }],
              score: 104,
            },
          ],
        },
      },
    } as any)

    vi.mocked(playerHooks.usePlayer).mockReturnValue({
      playerData: {
        player: { name: 'TestPlayer' },
      },
    } as any)
  })

  it('renders winning text and scores', async () => {
    render(<Results />)

    // Test text content
    const matchComplete = await screen.findByText(/Match Complete/i)
    expect(matchComplete).toBeDefined()

    const victoryMessage = await screen.findByText(/Victory!/i)
    expect(victoryMessage).toBeDefined()

    const score151 = await screen.findByText('151')
    expect(score151).toBeDefined()

    const score104 = await screen.findByText('104')
    expect(score104).toBeDefined()
  })

  it('renders defeat text if player is not in winning team', async () => {
    // Player is now on the losing team
    vi.mocked(playerHooks.usePlayer).mockReturnValue({
      playerData: {
        player: { name: 'Opponent1' },
      },
    } as any)

    render(<Results />)

    const matchComplete = await screen.findByText(/Match Complete/i)
    expect(matchComplete).toBeDefined()

    const defeatMessage = await screen.findByText(/Defeat/i)
    expect(defeatMessage).toBeDefined()
  })
})
