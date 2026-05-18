import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GameStatus } from '@/app/components/pages/boardPage/components/GameStatus'
import * as lobbyHooks from '@/hooks/lobby/useLobby'
import Announces from '@/types/enums/Announces'

vi.mock('@/hooks/useLobby')

describe('GameStatus Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(lobbyHooks.useLobby).mockReturnValue({
      lobbyData: {
        lobby: { id: 1, gamePhase: 'bidding' },
        game: {
          isDoubled: false,
          isReDoubled: false,
        },
      },
    } as any)
  })

  it('renders nothing when gamePhase is waiting', () => {
    const { container } = render(
      <GameStatus
        gamePhase="waiting"
        currentAnnounce={Announces.None}
        passCounter={0}
      />,
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders current player turn and phase', () => {
    render(
      <GameStatus
        gamePhase="bidding"
        currentPlayerName="TestPlayer"
        currentAnnounce={Announces.None}
        passCounter={0}
      />,
    )
    expect(screen.getByText(/TestPlayer's Turn/i)).toBeDefined()
    expect(screen.getByText('bidding')).toBeDefined()
  })

  it('renders current announce correctly', () => {
    render(
      <GameStatus
        gamePhase="bidding"
        currentPlayerName="TestPlayer"
        currentAnnounce={Announces.Hearts}
        passCounter={0}
      />,
    )
    // The bid is rendered as text 'Bid:' and an icon. We'll just verify the text is present.
    expect(screen.getByText(/Bid:/i)).toBeDefined()
  })

  it('renders pass counter when passCounter > 0 in bidding phase', () => {
    render(
      <GameStatus
        gamePhase="bidding"
        currentPlayerName="TestPlayer"
        currentAnnounce={Announces.Hearts}
        passCounter={2}
      />,
    )
    expect(screen.getByText(/Pass ×2/i)).toBeDefined()
  })
})
