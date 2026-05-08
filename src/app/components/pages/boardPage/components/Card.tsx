import { Diamond, Heart, Club, Spade } from 'lucide-react'
import backSideCard from '@/assets/common/BackSide.png'
import { type Card } from '@/types/models/Card.ts'
import Suit from '@/types/enums/Suit'

type CardProps = {
  card: Card
  isFaceUp?: boolean
  onClick?: () => void
  isClickable?: boolean
  size?: 'small' | 'normal'
  rotation?: number
}

export function Card({
  card,
  isFaceUp = true,
  onClick,
  isClickable = false,
  size = 'normal',
  rotation = 0,
}: CardProps) {
  const dimensions = size === 'small' ? 'w-22 h-35' : 'w-30 h-46'
  const iconSize = size === 'small' ? 'w-10 h-10' : 'w-16 h-16'
  const rankSize = size === 'small' ? 'text-lg' : 'text-2xl'
  const smallIconSize = size === 'small' ? 'w-4 h-4' : 'w-5 h-5'

  // Show card back if not face up
  if (!isFaceUp) {
    return (
      <div
        className={`relative ${dimensions} rounded-md overflow-hidden`}
        style={{ transform: `rotate(${rotation}deg)` }}
        onClick={onClick}
      >
        <img src={backSideCard} alt={'backSideCard'} />
        <div className="absolute inset-0 border-4 border-white shadow-xl" />
      </div>
    )
  }


  let Icon = Club
  let IconColor = 'text-neutral-700'

  switch (card.suit) {
    case Suit.Hearts:
      Icon = Heart
      IconColor = 'text-red-600'
      break
    case Suit.Diamonds:
      Icon = Diamond
      IconColor = 'text-red-600'
      break
    case Suit.Clubs:
      Icon = Club
      IconColor = 'text-neutral-700'
      break
    case Suit.Spades:
      Icon = Spade
      IconColor = 'text-neutral-700'
      break
  }

  return (
    <div
      onClick={onClick}
      className={`
        relative ${dimensions} rounded-md overflow-hidden
        ${isClickable ? 'cursor-pointer' : ''}
      `}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Liquid glass card background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/50 to-white/30 backdrop-blur-xl shadow-2xl">
        {/* Inner frosted layer */}
        <div className="absolute inset-[2px] bg-gradient-to-br from-white/40 via-white/20 to-white/10 rounded-sm backdrop-blur-sm">
          {/* Subtle texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 10px 10px, rgba(0,0,0,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          />

          {/* Soft gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-100/30 via-transparent to-neutral-200/20" />

          {/* Glass shine */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-60" />
        </div>
      </div>

      {/* Card content */}
      <div className="relative z-10 h-full flex flex-col p-3">
        {/* Top corner */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col items-center">
            <span className={`${rankSize} ${IconColor}`}>{card.rank}</span>
            <Icon
              className={`${smallIconSize} mt-0.5 ${IconColor}`}
              fill="currentColor"
            />
          </div>
        </div>

        {/* Center icon */}
        <div className="flex-1 flex items-center justify-center">
          <div>
            <Icon
              className={`${iconSize} ${IconColor} opacity-80`}
              fill="currentColor"
            />
          </div>
        </div>

        {/* Bottom corner (upside down) */}
        <div className="flex items-end justify-start rotate-180">
          <div className="flex flex-col items-center">
            <span className={`${rankSize} ${IconColor}`}>{card.rank}</span>
            <Icon
              className={`${smallIconSize} mt-0.5 ${IconColor}`}
              fill="currentColor"
            />
          </div>
        </div>
      </div>

      {/* Glass border */}
      <div className="absolute inset-0 rounded-xl border border-white/60 shadow-inner" />

      {/* Outer glow border */}
      <div className="absolute inset-0 rounded-xl border-2 border-neutral-300/20" />
    </div>
  )
}
