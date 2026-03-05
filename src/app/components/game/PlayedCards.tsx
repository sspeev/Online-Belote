import { Card as GameCard } from './Card'
import type { Card } from '@/types/models/Card'

type PlayedCardsProps = {
  tableCards: Array<Card | null>
}

// Slot config: index 0 = current player (bottom), 1 = right, 2 = top, 3 = left
const slotPositions = [
  'absolute bottom-[30%] left-1/2 -translate-x-1/2',
  'absolute right-[40%] top-1/2 -translate-y-1/2',
  'absolute top-[30%] left-1/2 -translate-x-1/2',
  'absolute left-[40%] top-1/2 -translate-y-1/2',
]

const PlayedCards = ({ tableCards }: PlayedCardsProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {tableCards.map((card, i) =>
        card ? (
          <div
            key={`${card.id}-${i}`}
            className={slotPositions[i]}
            style={{
              animation:
                'springIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
            }}
          >
            <GameCard card={card} isFaceUp={true} size="normal" rotation={0} />
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
