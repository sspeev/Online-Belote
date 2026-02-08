import { Club, Diamond, Heart, Spade } from 'lucide-react'
import { useLobby } from '@/hooks/useLobby.tsx'

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

export const CurrentBidDisplay = () => {
  const { lobbyData } = useLobby()
  const currentAnnounce = lobbyData.game.currentAnnounce

  if (currentAnnounce === 'pass') return null

  const isSuit = ['clubs', 'diamonds', 'hearts', 'spades'].includes(currentAnnounce)
  
  // Determine display properties based on bid type
  let label: string = currentAnnounce
  let textColor = 'text-gray-800'
  let borderColor = 'border-gray-300'
  let bgColor = 'bg-white/80'

  if (isSuit) {
    label = currentAnnounce.charAt(0).toUpperCase() + currentAnnounce.slice(1)
    if (['hearts', 'diamonds'].includes(currentAnnounce)) {
      textColor = 'text-red-600'
      borderColor = 'border-red-200'
      bgColor = 'bg-red-50/90'
    } else {
        textColor = 'text-neutral-900'
        borderColor = 'border-neutral-200'
        bgColor = 'bg-neutral-50/90'
    }
  } else if (currentAnnounce === 'No trump') {
      textColor = 'text-blue-700'
      borderColor = 'border-blue-300'
      bgColor = 'bg-blue-50/90'
  } else if (currentAnnounce === 'All trump') {
      textColor = 'text-yellow-700' 
      borderColor = 'border-yellow-300'
      bgColor = 'bg-yellow-50/90'
  }

  return (
    <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
       <div className={`
          flex items-center gap-3 px-6 py-3 rounded-2xl shadow-xl 
          border-2 backdrop-blur-md transition-all duration-300
          ${bgColor} ${borderColor} ${textColor}
       `}>
          <div className="text-sm font-medium uppercase tracking-wider opacity-70">Current Bid:</div>
          <div className="flex items-center gap-2">
            {isSuit && <SuitIcon type={currentAnnounce} className="w-6 h-6" />}
            <span className="text-xl font-bold whitespace-nowrap capitalize">
              {label}
            </span>
          </div>
       </div>
    </div>
  )
}
