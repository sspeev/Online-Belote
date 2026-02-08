import { Club, Diamond, Heart, Spade } from 'lucide-react'
import type { Lobby } from '@/types/models/Lobby'
import type { Game } from '@/types/models/Game'

interface GameStatusProps {
  gamePhase: Lobby['gamePhase']
  currentPlayerName?: string
  splitterName?: string
  currentAnnounce?: Game['currentAnnounce']
}

const SuitIcon = ({ type, className }: { type: string; className?: string }) => {
  switch (type) {
    case 'clubs':
      return <Club className={className} fill="black" />
    case 'diamonds':
      return <Diamond className={className} fill="red" color="red" />
    case 'hearts':
      return <Heart className={className} fill="red" color="red" />
    case 'spades':
      return <Spade className={className} fill="black" />
    default:
      return null
  }
}

export const GameStatus = ({ gamePhase, currentPlayerName, currentAnnounce }: GameStatusProps) => {
  if (gamePhase === 'waiting') return null

  let message = ''

  switch (gamePhase) {
    case 'splitting':
      message = currentPlayerName 
        ? `Waiting for ${currentPlayerName} to split...`
        : 'Waiting for split...'
      break
    case 'dealing':
      message = 'Dealing cards...'
      break
    case 'bidding':
      message = currentPlayerName
        ? `${currentPlayerName} is bidding...` 
        : 'Bidding in progress...'
      break
    case 'playing':
      message = currentPlayerName
        ? `${currentPlayerName}'s turn`
        : 'Game in progress...'
      break
    default:
      // If we are in another phase but showing status might be useful?
      // For now just keep null if no message, but we might want to show bid still?
      if (!currentAnnounce || currentAnnounce === 'pass') return null
      break
  }

  // Bid Display Logic
  let bidDisplay = null
  if (currentAnnounce && currentAnnounce !== 'pass') {
      const isSuit = ['clubs', 'diamonds', 'hearts', 'spades'].includes(currentAnnounce)
      let label: string = currentAnnounce
      let textColor = 'text-gray-800'
      let bgColor = 'bg-white/90'
      let borderColor = 'border-gray-200'

      if (isSuit) {
        label = currentAnnounce.charAt(0).toUpperCase() + currentAnnounce.slice(1)
        if (['hearts', 'diamonds'].includes(currentAnnounce)) {
          textColor = 'text-red-600'
          bgColor = 'bg-red-50/90'
          borderColor = 'border-red-200'
        } else {
            textColor = 'text-neutral-900'
            bgColor = 'bg-neutral-50/90'
            borderColor = 'border-neutral-200'
        }
      } else if (currentAnnounce === 'No trump') {
          textColor = 'text-blue-700'
          bgColor = 'bg-blue-50/90'
          borderColor = 'border-blue-200'
      } else if (currentAnnounce === 'All trump') {
          textColor = 'text-yellow-700' 
          bgColor = 'bg-yellow-50/90'
          borderColor = 'border-yellow-200'
      }

      bidDisplay = (
        <div className={`
          flex items-center gap-2 px-4 py-2 mt-2 rounded-xl shadow-lg 
          border backdrop-blur-md transition-all duration-300
          ${bgColor} ${borderColor} ${textColor}
        `}>
           <div className="text-xs font-bold uppercase tracking-wider opacity-70">Bid:</div>
           <div className="flex items-center gap-1.5">
             {isSuit && <SuitIcon type={currentAnnounce} className="w-5 h-5" />}
             <span className="text-lg font-bold whitespace-nowrap capitalize">
               {label}
             </span>
           </div>
        </div>
      )
  }

  return (
    <div className="absolute top-8 right-8 z-40 pointer-events-none flex flex-col items-end gap-2">
      {message && (
          <div className="bg-black/60 backdrop-blur-md text-white px-6 py-2 rounded-full shadow-xl border border-white/10 font-medium tracking-wide animate-in slide-in-from-top-4 fade-in duration-500">
            {message}
          </div>
      )}
      {bidDisplay}
    </div>
  )
}
