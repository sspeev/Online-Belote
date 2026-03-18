import { Card as GameCard } from './Card'
import type { Card } from '@/types/models/Card'
import PlayerProfile from './PlayerProfile'
import { useIsMobile } from '@/hooks/useIsMobile'

type PlayerPosition = 'bottom' | 'top' | 'left' | 'right'

type PlayerPlateProps = {
  playerIndex: number
  playerName: string
  cards: Card[]
  position: PlayerPosition
  onCardClick?: (card: Card) => void
  isCurrentPlayer?: boolean
}


export function PlayerPlate({
  playerIndex,
  playerName,
  cards,
  position,
  onCardClick,
  isCurrentPlayer = false,
}: PlayerPlateProps) {
  const isMobile = useIsMobile()

  // Dynamic position config based on responsive state
  const config = {
    bottom: {
      container: `absolute -bottom-5 left-1/2 -translate-x-1/2 w-full flex flex-row-reverse items-center justify-center ${isMobile ? 'gap-1' : 'gap-2'}`,
      cardsContainer: `flex justify-center ${isMobile ? '-space-x-8' : '-space-x-12'}`,
      cardRotation: 0,
      profileContainer: 'mt-4',
      cardsDirection: 'row' as const,
    },
    top: {
      container: `absolute top-0 left-1/2 -translate-x-1/2 w-full flex flex-row items-center justify-center ${isMobile ? 'gap-1' : 'gap-2'}`,
      cardsContainer: `flex justify-center ${isMobile ? '-space-x-12' : '-space-x-20'}`,
      cardRotation: 0,
      profileContainer: 'mb-4',
      cardsDirection: 'row' as const,
    },
    right: {
      container: `absolute h-full flex flex-row-reverse items-center top-1/2 -translate-y-1/2 ${isMobile ? 'right-0' : 'right-4'}`,
      cardsContainer: `flex flex-col items-center ${isMobile ? '-space-y-16' : '-space-y-38'}`,
      cardRotation: -90,
      profileContainer: `absolute ${isMobile ? 'right-6' : 'right-16 mr-4'}`,
      cardsDirection: 'column' as const,
    },
    left: {
      container: `absolute h-full flex flex-row items-center top-1/2 -translate-y-1/2 ${isMobile ? 'left-0' : 'left-4'}`,
      cardsContainer: `flex flex-col items-center ${isMobile ? '-space-y-16' : '-space-y-28'}`,
      cardRotation: 90,
      profileContainer: `absolute ${isMobile ? 'left-6' : 'left-16 ml-4'}`,
      cardsDirection: 'column' as const,
    },
  }[position]

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
                  ? 'hover:-translate-y-4 active:scale-95 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:z-10 cursor-pointer relative'
                  : ''
              }
            `}
          >
            <GameCard
              isFaceUp={isCurrentPlayer}
              card={card}
              onClick={() => handleCardClick(card)}
              size={isMobile ? 'small' : 'normal'}
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
