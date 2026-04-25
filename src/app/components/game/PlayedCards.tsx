import { Card as GameCard } from './Card'
import type { Card } from '@/types/models/Card'

type PlayedCardsProps = {
  tableCards: Array<Card | null>
  size?: 'small' | 'normal'
}

// Slot config: index 0 = current player (bottom), 1 = right, 2 = top, 3 = left
const slotPositions = [
  'absolute bottom-[30%] left-1/2 -translate-x-1/2',
  'absolute right-[40%] top-1/2 -translate-y-1/2',
  'absolute top-[30%] left-1/2 -translate-x-1/2',
  'absolute left-[40%] top-1/2 -translate-y-1/2',
]

const PlayedCards = ({ tableCards, size = 'normal' }: PlayedCardsProps) => {
  const isMobile = size === 'small'

  const getMobileSlotPosition = (index: number) => {
    switch (index) {
      case 0: return 'absolute bottom-[19%] left-1/2 -translate-x-1/2'
      case 1: return 'absolute right-[30%] top-1/2 -translate-y-1/2'
      case 2: return 'absolute top-[19%] left-1/2 -translate-x-1/2'
      case 3: return 'absolute left-[30%] top-1/2 -translate-y-1/2'
      default: return ''
    }
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {tableCards.map((card, i) =>
        card ? (
          <div
            key={`${card.id}-${i}`}
            className={isMobile ? getMobileSlotPosition(i) : slotPositions[i]}
            style={{
              animation:
                'springIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
            }}
          >
            <GameCard card={card} isFaceUp={true} size={size} rotation={0} />
          </div>
        ) : null,
      )}

      <style>{`
        @keyframes springIn {
          0%   { opacity: 0; transform: translateY(-20px) scale(0.7); }
          60%  { opacity: 1; transform: translateY(4px)  scale(1.05); }
          100% { opacity: 1; transform: translateY(0)    scale(1); }
        }
      `}</style>
    </div>
  )
}

export default PlayedCards
