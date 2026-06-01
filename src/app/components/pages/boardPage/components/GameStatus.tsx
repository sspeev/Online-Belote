import { Club, Diamond, Heart, Spade } from 'lucide-react'
import type { Lobby } from '@/types/models/Lobby'
import type { Game } from '@/types/models/Game'
import Announces from '@/types/enums/Announces'
import { useLobby } from '@/hooks/lobby/useLobby'
import { bids } from '@/constants/bids'

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

export const GameStatus = ({
  gamePhase,
  currentPlayerName,
  currentAnnounce,
  passCounter,
}: GameStatusProps) => {
  const { lobbyData } = useLobby()

  if (gamePhase === 'waiting') return null

  // Bid Display Logic
  let bidDisplay = null

  if (currentAnnounce !== Announces.None) {
    const bidConfig = bids.find((b) => b.type === currentAnnounce)

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
            <BidIcon type={currentAnnounce} className="w-8 h-8 text-2xl" />
          </div>
        </div>
      )
    }
  }

  return (
    <section className="relative z-10 flex items-center justify-between px-3 sm:px-8 py-1.5 sm:py-3 bg-white/40 dark:bg-background-dark/40 backdrop-blur-sm border-t border-brand-burnt/5 shrink-0">
      {/* Left: turn indicator + phase */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Coloured dot */}
        <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />

        <span className="text-[10px] sm:text-xs font-medium text-slate-500 dark:text-slate-400">
          {currentPlayerName ? `${currentPlayerName}'s Turn` : 'Waiting…'}
        </span>

        <span className="hidden sm:inline text-xs text-slate-300 dark:text-slate-600">
          |
        </span>

        <span className="hidden sm:inline text-xs font-medium text-slate-500 dark:text-slate-400 capitalize">
          {lobbyData.lobby.gamePhase}
        </span>

        {passCounter > 0 && gamePhase === 'bidding' && (
          <span className="text-[10px] sm:text-xs font-bold text-red-500 dark:text-red-400">
            Pass x{passCounter}
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
            x4
          </span>
        )}
        {!lobbyData.game.isReDoubled && lobbyData.game.isDoubled && (
          <span className="flex items-center justify-center px-3 py-2 mt-2 bg-linear-to-r from-amber-500 to-orange-500 text-white text-xs sm:text-sm font-black rounded-xl shadow-lg shadow-amber-500/30 border border-amber-400/30 backdrop-blur-md">
            x2
          </span>
        )}
      </div>
    </section>
  )
}
