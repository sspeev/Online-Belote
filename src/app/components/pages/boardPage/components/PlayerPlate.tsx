import { Card as GameCard } from './Card'
import type { Card } from '@/types/models/Card'
import PlayerProfile from './PlayerProfile'
import { useIsMobile } from '@/hooks/useIsMobile'
import Announces from '@/types/enums/Announces'
import { Club, Diamond, Heart, Spade } from 'lucide-react'

type PlayerPosition = 'bottom' | 'top' | 'left' | 'right'

type PlayerPlateProps = {
  playerIndex: number
  playerName: string
  cards: Card[]
  position: PlayerPosition
  onCardClick?: (card: Card) => void
  isCurrentPlayer?: boolean
  announceOffer?: Announces
}

export function PlayerPlate({
  playerIndex,
  playerName,
  cards,
  position,
  onCardClick,
  isCurrentPlayer = false,
  announceOffer = Announces.None,
}: PlayerPlateProps) {
  const isMobile = useIsMobile()

  const config = {
    bottom: {
      container: `absolute -bottom-[6.25rem] lg:bottom-0 w-full flex flex-col-reverse lg:flex-row-reverse items-center justify-center gap-1 lg:gap-2`,
      cardsContainer: `flex justify-center ${isMobile ? '-space-x-14' : '-space-x-12'}`,
      cardRotation: 0,
      profileContainer: 'mt-4',
      cardsDirection: 'row' as const,
    },
    top: {
      container: `absolute -top-[6.25rem] lg:top-0 w-full flex flex-col lg:flex-row items-center justify-center gap-1 lg:gap-2`,
      cardsContainer: `flex justify-center ${isMobile ? '-space-x-16' : '-space-x-20'}`,
      cardRotation: 0,
      profileContainer: 'mb-4',
      cardsDirection: 'row' as const,
    },
    right: {
      container: `absolute h-full flex flex-row-reverse items-center -right-15 lg:right-4`,
      cardsContainer: `flex flex-col items-center ${isMobile ? '-space-y-30' : '-space-y-38'}`,
      cardRotation: -90,
      profileContainer: `absolute right-15 lg:right-16 mr-4`,
      cardsDirection: 'column' as const,
    },
    left: {
      container: `absolute h-full flex flex-row items-center -left-15 lg:left-4`,
      cardsContainer: `flex flex-col items-center ${isMobile ? '-space-y-30' : '-space-y-38'}`,
      cardRotation: 90,
      profileContainer: `absolute left-15 lg:left-16 ml-4`,
      cardsDirection: 'column' as const,
    },
  }[position]

  const handleCardClick = (card: Card | null) => {
    if (card && onCardClick) {
      onCardClick(card)
    }
  }

  const getBidConfig = (type: Announces) => {
    switch (type) {
      case Announces.Pass:
        return { label: 'Pass', color: 'bg-gray-300/90 text-gray-800' }
      case Announces.Clubs:
        return { icon: Club, color: 'bg-neutral-100 text-black', fill: 'black' }
      case Announces.Diamonds:
        return { icon: Diamond, color: 'bg-red-100 text-red-600', fill: 'red' }
      case Announces.Hearts:
        return { icon: Heart, color: 'bg-red-100 text-red-600', fill: 'red' }
      case Announces.Spades:
        return { icon: Spade, color: 'bg-neutral-100 text-black', fill: 'black' }
      case Announces.NoTrump:
        return { label: 'NT', color: 'bg-blue-100 text-blue-700' }
      case Announces.AllTrumps:
        return { label: 'AT', color: 'bg-yellow-100 text-yellow-800' }
      case Announces.Double:
        return { label: 'X2', color: 'bg-red-600 text-white font-bold' }
      case Announces.ReDouble:
        return { label: 'X4', color: 'bg-red-800 text-white font-bold' }
      default:
        return null
    }
  }

  const bidConfig = getBidConfig(announceOffer)

  return (
    <div className={`${config.container}`}>
      {/* Player Cards */}
      <div className={`${config.cardsContainer}`}>
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

      {/* Player Profile & Bidding Overlay */}
      <div className={`${config.profileContainer} relative`}>
        {bidConfig && (
          <div
            className={`absolute -top-7 left-1/2 -translate-x-1/2 flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-semibold shadow-md border border-white/20 backdrop-blur-sm ${bidConfig.color}`}
          >
            {'icon' in bidConfig && bidConfig.icon ? (
              <bidConfig.icon className="size-3.5" fill={bidConfig.fill} color={bidConfig.fill === 'red' ? 'red' : 'currentColor'} />
            ) : (
              <span>{bidConfig.label}</span>
            )}
          </div>
        )}
        <PlayerProfile
          index={playerIndex}
          name={playerName}
          position={position}
        />
      </div>
    </div>
  )
}
