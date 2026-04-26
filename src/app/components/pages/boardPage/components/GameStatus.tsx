import { Club, Diamond, Heart, Spade } from 'lucide-react'
import type { Lobby } from '@/types/models/Lobby'
import type { Game } from '@/types/models/Game'
import Announces from '@/types/enums/Announces'
import { useLobby } from '@/hooks/useLobby'

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
    // const key = Object.keys(Announces).find(
    //   (k) => k.toLowerCase() === val.toLowerCase(),
    // ) as keyof typeof Announces

    // Check if we found a key and it corresponds to a value
    // if (key) {
    //   // Announces[key] returns the value (number)
    //   return Announces[key] as unknown as Announces
    // }
  }
  return null
}

export const GameStatus = ({
  gamePhase,
  currentPlayerName,
  currentAnnounce,
  passCounter,
}: GameStatusProps) => {
  const { lobbyData } = useLobby()

  if (gamePhase === 'waiting') return null
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
    <section className="relative z-10 flex items-center justify-between px-3 sm:px-8 py-1.5 sm:py-3 bg-white/40 dark:bg-background-dark/40 backdrop-blur-sm border-t border-primary/5 shrink-0">

      {/* Left: turn indicator + phase */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Coloured dot */}
        <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />

        <span className="text-[10px] sm:text-xs font-medium text-slate-500 dark:text-slate-400">
          {currentPlayerName ? `${currentPlayerName}'s Turn` : 'Waiting…'}
        </span>

        <span className="hidden sm:inline text-xs text-slate-300 dark:text-slate-600">|</span>

        <span className="hidden sm:inline text-xs font-medium text-slate-500 dark:text-slate-400 capitalize">
          {lobbyData.lobby.gamePhase}
        </span>

        {/* Pass counter badge */}
        {passCounter > 0 && gamePhase === 'bidding' && (
          <span className="text-[10px] sm:text-xs font-bold text-red-500 dark:text-red-400">
            Pass ×{passCounter}
          </span>
        )}
      </div>

      {/* Right: current announce icon pill — empty when no bid yet */}
      <div className="flex items-center gap-2">
        {bidDisplay ?? (
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            No bid
          </span>
        )}
        {lobbyData.game.isReDoubled && (
          <span className="flex items-center justify-center px-3 py-2 mt-2 bg-linear-to-r from-red-600 to-rose-600 text-white text-xs sm:text-sm font-black rounded-xl shadow-lg shadow-red-500/30 border border-red-400/30 backdrop-blur-md animate-pulse">
            ×4
          </span>
        )}
        {!lobbyData.game.isReDoubled && lobbyData.game.isDoubled && (
          <span className="flex items-center justify-center px-3 py-2 mt-2 bg-linear-to-r from-amber-500 to-orange-500 text-white text-xs sm:text-sm font-black rounded-xl shadow-lg shadow-amber-500/30 border border-amber-400/30 backdrop-blur-md">
            ×2
          </span>
        )}
      </div>
    </section>
  )
}
