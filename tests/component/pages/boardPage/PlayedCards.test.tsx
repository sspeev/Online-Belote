import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import PlayedCards from '@/app/components/pages/boardPage/components/PlayedCards'
import type { Card } from '@/types/models/Card'

vi.mock('@/app/components/pages/boardPage/components/Card', () => ({
  Card: ({ card }: { card: Card }) => (
    <div data-testid={`card-${card.suit}-${card.rank}`}>Card</div>
  )
}))

describe('PlayedCards Component', () => {
  it('renders nothing when table is empty', () => {
    const { container } = render(<PlayedCards tableCards={[null, null, null, null]} />)
    expect(screen.queryByTestId(/card-/)).toBeNull()
  })

  it('renders played cards on the table', () => {
    const tableCards: Array<Card | null> = [
      { id: 1, suit: 'Hearts', rank: 'A' },
      null,
      { id: 3, suit: 'Spades', rank: 'K' },
      null,
    ]

    render(<PlayedCards tableCards={tableCards} />)

    expect(screen.getByTestId('card-Hearts-A')).toBeDefined()
    expect(screen.getByTestId('card-Spades-K')).toBeDefined()
  })
})
