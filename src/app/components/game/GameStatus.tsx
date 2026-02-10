import { Club, Diamond, Heart, Spade } from 'lucide-react'
import type { Lobby } from '@/types/models/Lobby'
import type { Game } from '@/types/models/Game'
import Announces from '@/types/enums/Announces'

interface GameStatusProps {
  gamePhase: Lobby['gamePhase']
  currentPlayerName?: string
  splitterName?: string
  currentAnnounce: Game['currentAnnounce']
  passCounter: number
}

const BidIcon = ({
  type,
  className,
}: {
  type: Announces
  className?: string
}) => {
  const commonClass = `${className} flex items-center justify-center font-black leading-none`
  switch (type) {
    case Announces.Clubs:
      return <Club className={className} fill="black" />
    case Announces.Diamonds:
      return <Diamond className={className} fill="red" color="red" />
    case Announces.Hearts:
      return <Heart className={className} fill="red" color="red" />
    case Announces.Spades:
      return <Spade className={className} fill="black" />
    case Announces.Pass:
      return <span className={commonClass}>P</span>
    case Announces.NoTrump:
      return <span className={commonClass}>A</span>
    case Announces.AllTrumps:
      return <span className={commonClass}>J</span>
    default:
      return null
  }
}

const getAnnounceType = (
  val: string | number | Announces | undefined | null,
): Announces | null => {
  if (val === undefined || val === null) return null
  if (typeof val === 'number') return val as Announces
  if (typeof val === 'string') {
    // If the string is a number (e.g. "1"), parse it
    const num = parseInt(val, 10)
    if (!isNaN(num)) return num as Announces

    // Otherwise try to match by name
    const key = Object.keys(Announces).find(
      (k) => k.toLowerCase() === val.toLowerCase(),
    ) as keyof typeof Announces

    // Check if we found a key and it corresponds to a value
    if (key) {
      // Announces[key] returns the value (number)
      return Announces[key] as unknown as Announces
    }
  }
  return null
}

export const GameStatus = ({
  gamePhase,
  currentPlayerName,
  currentAnnounce,
  passCounter,
}: GameStatusProps) => {
  if (gamePhase === 'waiting') return null

  let message = ''
  switch (gamePhase) {
    case 'splitting':
      message = currentPlayerName
        ? `Turn: ${currentPlayerName} (Splitting)`
        : 'Waiting for split...'
      break
    case 'dealing':
      message = 'Dealing cards...'
      break
    case 'bidding':
      message = currentPlayerName
        ? `Turn: ${currentPlayerName} (Bidding)`
        : 'Bidding in progress...'
      break
    case 'playing':
      message = currentPlayerName
        ? `Turn: ${currentPlayerName}`
        : 'Game in progress...'
      break
    default:
      break
  }
  const bids: {
    type: Announces
    icon?: typeof Club
    fill?: string
    label?: string
    color: string
  }[] = [
    {
      type: Announces.Pass,
      label: 'PASS',
      color: 'bg-gray-300/80 text-gray-700 border-gray-400/30 font-bold',
    },
    {
      type: Announces.Clubs,
      icon: Club,
      fill: 'black',
      color: 'bg-neutral-200/80 text-neutral-900 border-neutral-400/30',
    },
    {
      type: Announces.Diamonds,
      icon: Diamond,
      fill: 'red',
      color: 'bg-red-100/80 text-red-600 border-red-300/30',
    },
    {
      type: Announces.Hearts,
      icon: Heart,
      fill: 'red',
      color: 'bg-red-100/80 text-red-600 border-red-300/30',
    },
    {
      type: Announces.Spades,
      icon: Spade,
      fill: 'black',
      color: 'bg-neutral-200/80 text-neutral-900 border-neutral-400/30',
    },
    {
      type: Announces.NoTrump,
      label: 'No Trump',
      color: 'bg-blue-100/80 text-blue-700 border-blue-300/30',
    },
    {
      type: Announces.AllTrumps,
      label: 'All Trump',
      color: 'bg-yellow-100/80 text-yellow-700 border-yellow-300/30',
    },
  ]
  // Bid Display Logic
  let bidDisplay = null

  const announceType = getAnnounceType(currentAnnounce)

  if (announceType !== null && announceType !== Announces.None) {
    const bidConfig = bids.find((b) => b.type === announceType)

    if (bidConfig) {
      bidDisplay = (
        <div
          className={`
            flex items-center gap-2 px-4 py-2 mt-2 rounded-xl shadow-lg 
            border backdrop-blur-md transition-all duration-300
            ${bidConfig.color}
          `}
        >
          <div className="text-xs font-bold uppercase tracking-wider opacity-70">
            Bid:
          </div>
          <div className="flex items-center justify-center min-w-[32px]">
            <BidIcon type={announceType} className="w-8 h-8 text-2xl" />
          </div>
        </div>
      )
    }
  }

  return (
    <div className="absolute top-8 right-8 z-40 pointer-events-none flex flex-col items-end gap-2">
      {message && (
        <div className="bg-black/60 backdrop-blur-md text-white px-6 py-2 rounded-full shadow-xl border border-white/10 font-medium tracking-wide animate-in slide-in-from-top-4 fade-in duration-500">
          {message}
        </div>
      )}
      {bidDisplay}

      {/* Pass Counter Display */}
      {passCounter > 0 && (
        <div className="bg-red-500/80 backdrop-blur-md text-white px-4 py-1 rounded-full shadow-lg border border-red-400/30 text-sm font-bold animate-in fade-in slide-in-from-right-4">
          Passes: {passCounter}/3
        </div>
      )}
    </div>
  )
}
