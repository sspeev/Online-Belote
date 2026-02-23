import { Card as GameCard } from './Card'
import type { Card } from '@/types/models/Card'
import PlayerProfile from './PlayerProfile'

type PlayerPosition = 'bottom' | 'top' | 'left' | 'right'

type PlayerPlateProps = {
  playerIndex: number
  playerName: string
  cards: Card[]
  position: PlayerPosition
  onCardClick?: (card: Card) => void
  isCurrentPlayer?: boolean
}

// Position-specific layouts
const positionConfig = {
  bottom: {
    container:
      'absolute -bottom-5 left-1/2 -translate-x-1/2 w-full flex flex-row-reverse items-center justify-center gap-2',
    cardsContainer: 'flex justify-center -space-x-12',
    cardRotation: 0,
    profileContainer: 'mt-4',
    cardsDirection: 'row' as const,
  },
  top: {
    container:
      'absolute top-0 left-1/2 -translate-x-1/2 w-full flex flex-row items-center justify-center gap-2',
    cardsContainer: 'flex justify-center -space-x-20',
    cardRotation: 0,
    profileContainer: 'mb-4',
    cardsDirection: 'row' as const,
  },
  right: {
    container:
      'absolute right-12 top-1/2 -translate-y-1/2 h-full flex flex-row-reverse items-center',
    cardsContainer: 'flex flex-col items-center -space-y-38',
    cardRotation: -90,
    profileContainer: 'absolute right-16 mr-4',
    cardsDirection: 'column' as const,
  },
  left: {
    container:
      'absolute left-12 top-1/2 -translate-y-1/2 h-full flex flex-row items-center',
    cardsContainer: 'flex flex-col items-center -space-y-28',
    cardRotation: 90,
    profileContainer: 'absolute left-16 ml-4',
    cardsDirection: 'column' as const,
  },
}

export function PlayerPlate({
  playerIndex,
  playerName,
  cards,
  position,
  onCardClick,
  isCurrentPlayer = false,
}: PlayerPlateProps) {
  const config = positionConfig[position]

  const handleCardClick = (card: Card | null) => {
    if (card && onCardClick) {
      onCardClick(card)
    }
  }

  return (
    <div className={config.container}>
      {/* Player Cards */}
      <div className={config.cardsContainer}>
        {cards.map((card) => (
          <div
            key={card.id}
            className={`
              transition-transform duration-200 ease-out
              ${
                isCurrentPlayer
                  ? 'hover:-translate-y-4 active:scale-95 hover:drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] cursor-pointer'
                  : ''
              }
            `}
          >
            <GameCard
              isFaceUp={isCurrentPlayer}
              card={card}
              onClick={() => handleCardClick(card)}
              size="normal"
              rotation={config.cardRotation}
            />
          </div>
        ))}
      </div>

      {/* Player Profile */}
      <div className={config.profileContainer}>
        <PlayerProfile
          index={playerIndex}
          name={playerName}
          position={position}
        />
      </div>
    </div>
  )
}
