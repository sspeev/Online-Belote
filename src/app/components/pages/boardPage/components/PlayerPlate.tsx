
//hooks
import { useRef } from 'react'
import { useIsMobile } from '@/hooks/common/useIsMobile'

//components
import PlayerProfile from './PlayerProfile'
//types
import { Card as GameCard } from './Card'
import type { Card } from '@/types/models/Card'
import Announces from '@/types/enums/Announces'

//icons
import { Club, Diamond, Heart, Spade } from 'lucide-react'

//animation
import { useGSAP } from '@gsap/react'


type PlayerPosition = 'bottom' | 'top' | 'left' | 'right'

type PlayerPlateProps = {
  playerIndex: number
  playerName: string
  cards: Card[]
  position: PlayerPosition
  onCardClick?: (card: Card) => void
  isCurrentPlayer?: boolean
  isActive?: boolean
  announceOffer?: Announces
}

export function PlayerPlate({
  playerIndex,
  playerName,
  cards,
  position,
  onCardClick,
  isCurrentPlayer = false,
  isActive = false,
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
      profileContainer: `absolute mr-4`,
      cardsDirection: 'column' as const,
    },
    left: {
      container: `absolute h-full flex flex-row items-center -left-15 lg:left-4`,
      cardsContainer: `flex flex-col items-center ${isMobile ? '-space-y-30' : '-space-y-38'}`,
      cardRotation: 90,
      profileContainer: `absolute ml-4`,
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
        return { label: 'Pass', color: 'bg-slate-500/20 text-slate-300 border-slate-500/40 backdrop-blur-md' }
      case Announces.Clubs:
        return { icon: Club, color: 'bg-white/10 text-white border-white/20 backdrop-blur-md', fill: 'white' }
      case Announces.Diamonds:
        return { icon: Diamond, color: 'bg-rose-500/20 text-rose-400 border-rose-500/30 backdrop-blur-md', fill: 'red' }
      case Announces.Hearts:
        return { icon: Heart, color: 'bg-rose-500/20 text-rose-400 border-rose-500/30 backdrop-blur-md', fill: 'red' }
      case Announces.Spades:
        return { icon: Spade, color: 'bg-white/10 text-white border-white/20 backdrop-blur-md', fill: 'white' }
      case Announces.NoTrump:
        return { label: 'NT', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30 backdrop-blur-md' }
      case Announces.AllTrumps:
        return { label: 'AT', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30 backdrop-blur-md' }
      case Announces.Double:
        return { label: 'Double', color: 'bg-linear-to-r from-orange-500 to-red-600 text-white font-black border-red-500/30 shadow-lg shadow-orange-500/20 uppercase tracking-wider text-[10px]' }
      case Announces.ReDouble:
        return { label: 'ReDouble', color: 'bg-linear-to-r from-red-600 to-rose-700 text-white font-black border-rose-600/30 shadow-lg shadow-red-600/20 uppercase tracking-wider text-[10px]' }
      default:
        return null
    }
  }

  const bidConfig = getBidConfig(announceOffer)

  const cardsRef = useRef<HTMLDivElement>(null)

  // Animation removed for troubleshooting
  useGSAP(() => {}, { scope: cardsRef, dependencies: [cards.length] })

  return (
    <div className={`${config.container}`}>
      {/* Player Cards */}
      <div ref={cardsRef} className={`${config.cardsContainer}`}>
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
            className={`absolute -top-8 left-1/2 -translate-x-1/2 flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-bold shadow-xl border backdrop-blur-md select-none transition-all duration-300 hover:scale-105 ${bidConfig.color}`}
          >
            {'icon' in bidConfig && bidConfig.icon ? (
              <bidConfig.icon
                className="size-3.5"
                fill={bidConfig.fill === 'red' ? '#f43f5e' : (bidConfig.fill === 'white' ? '#ffffff' : '#000000')}
                color={bidConfig.fill === 'red' ? '#f43f5e' : (bidConfig.fill === 'white' ? '#ffffff' : 'currentColor')}
              />
            ) : (
              <span className="uppercase tracking-wider font-extrabold">{bidConfig.label}</span>
            )}
          </div>
        )}
        <PlayerProfile
          index={playerIndex}
          name={playerName}
          position={position}
          isActive={isActive}
        />
      </div>
    </div>
  )
}
