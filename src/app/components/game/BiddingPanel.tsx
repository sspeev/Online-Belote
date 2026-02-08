import { Club, Diamond, Heart, Spade, Eye, EyeOff } from 'lucide-react'
import { useLobby } from '@/hooks/useLobby.ts'
import { usePlayer } from '@/hooks/usePlayer'
import { useSignalR } from '@/hooks/useSignalR'
import { useState } from 'react'

type BidType =
  | 'hearts'
  | 'diamonds'
  | 'clubs'
  | 'spades'
  | 'No trump'
  | 'All trump'
  | 'pass'

const BiddingPanel = () => {
  const { lobbyData } = useLobby()
  const { playerData } = usePlayer()
  const { invoke } = useSignalR()
  const [minimized, setMinimized] = useState(false)

  const handleBid = async (bid: BidType) => {
    if (!lobbyData.game.currentPlayer || lobbyData.game.currentPlayer.name !== playerData.player.name) {
       console.warn('Not your turn!')
       return
    }

    try {
      await invoke('MakeBid', lobbyData.lobby.id.toString(), playerData.player.name, bid)
      console.log('Bid submitted:', bid)
    } catch (err) {
      console.error('Failed to submit bid:', err)
    }
  }

  const bids: {
    type: BidType
    icon?: typeof Club
    fill?: string
    label?: string
    color: string
  }[] = [
    { type: 'clubs', icon: Club, fill: 'black', color: 'bg-neutral-200/80 text-neutral-900 border-neutral-400/30' },
    { type: 'diamonds', icon: Diamond, fill: 'red', color: 'bg-red-100/80 text-red-600 border-red-300/30' },
    { type: 'hearts', icon: Heart, fill: 'red', color: 'bg-red-100/80 text-red-600 border-red-300/30' },
    { type: 'spades', icon: Spade, fill: 'black', color: 'bg-neutral-200/80 text-neutral-900 border-neutral-400/30' },
    { type: 'No trump', label: 'No Trump', color: 'bg-blue-100/80 text-blue-700 border-blue-300/30' },
    { type: 'All trump', label: 'All Trump', color: 'bg-yellow-100/80 text-yellow-700 border-yellow-300/30' },
    { type: 'pass', label: 'PASS', color: 'bg-gray-300/80 text-gray-700 border-gray-400/30 font-bold' },
  ]

  /* Logic for bid validation */
  const BID_HIERARCHY: Record<string, number> = {
    'clubs': 1,
    'diamonds': 2,
    'hearts': 3,
    'spades': 4,
    'No trump': 5,
    'All trump': 6
  }

  const getBidRank = (bid: BidType | string) => BID_HIERARCHY[bid] || 0

  const isBidValid = (bid: BidType) => {
    if (bid === 'pass') return true
    const currentAnnounce = lobbyData.game.currentAnnounce
    
    // If no announcement yet (or pass), any bid is valid
    if (currentAnnounce === 'pass') return true
    
    // Must be higher than current announce
    return getBidRank(bid) > getBidRank(currentAnnounce)
  }

  const currentPlayerName = lobbyData.game.currentPlayer?.name
  const isMyTurn = currentPlayerName === playerData.player.name

  if(lobbyData.lobby.gamePhase !== 'bidding') return null

  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl px-4">
        <div className={`
          flex flex-col gap-6 rounded-3xl transition-all duration-500 relative
          ${minimized ? 'bg-transparent' : 'bg-white/40 backdrop-blur-2xl shadow-2xl border border-white/50 p-8'}
        `}>
          
          {/* Toggle Visibility Button */}
          <button 
             onClick={() => setMinimized(!minimized)}
             className={`
               absolute ${minimized ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : 'top-4 right-4'}
               p-3 rounded-full bg-white/50 hover:bg-white/80 active:scale-95 transition-all shadow-md backdrop-blur-md z-50
             `}
             title={minimized ? "Show Bidding Panel" : "Hide to see cards"}
          >
             {minimized ? <Eye className="w-6 h-6 text-gray-800" /> : <EyeOff className="w-5 h-5 text-gray-700" />}
          </button>

          {!minimized && (
            <>
              {/* Header Status */}
              <div className="text-center space-y-2">
                <h2 className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${isMyTurn ? 'from-green-600 to-emerald-800' : 'from-gray-600 to-gray-800'}`}>
                  {isMyTurn ? "Your Bid" : `${currentPlayerName} is bidding...`}
                </h2>
                {!isMyTurn && (
                   <div className="flex justify-center gap-1">
                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                   </div>
                )}
              </div>


          {/* Bidding Grid - Only visible if my turn */}
          {isMyTurn && (
             <div className="grid grid-cols-4 gap-4 animate-in fade-in zoom-in duration-300">
               {/* Suits Row */}
               {bids.slice(0, 4).map((bid) => {
                 const valid = isBidValid(bid.type)
                 return (
                   <button
                     key={bid.type}
                     onClick={() => valid && handleBid(bid.type)}
                     disabled={!valid}
                     className={`
                       aspect-square rounded-2xl flex flex-col items-center justify-center gap-2
                       transition-all shadow-lg border-2 backdrop-blur-md ${bid.color}
                       ${valid 
                          ? 'hover:scale-105 active:scale-95 hover:shadow-xl cursor-pointer' 
                          : 'opacity-40 grayscale cursor-not-allowed scale-95 border-dashed'}
                     `}
                   >
                     {bid.icon && <bid.icon className="w-10 h-10" fill="currentColor" />}
                     <span className="font-semibold capitalize">{bid.type}</span>
                   </button>
                 )
               })}

               {/* Special Bids Row (Spanning columns) */}
               <div className="col-span-4 grid grid-cols-3 gap-4 mt-2">
                 {bids.slice(4).map((bid) => {
                   const valid = isBidValid(bid.type)
                   return (
                     <button
                       key={bid.type}
                       onClick={() => valid && handleBid(bid.type)}
                       disabled={!valid}
                       className={`
                         h-16 rounded-xl flex items-center justify-center gap-2
                         transition-all shadow-lg border-2 backdrop-blur-md ${bid.color}
                         ${valid 
                            ? 'hover:scale-105 active:scale-95 hover:shadow-xl cursor-pointer' 
                            : 'opacity-40 grayscale cursor-not-allowed scale-95 border-dashed'}
                       `}
                     >
                       <span className="font-bold text-lg uppercase tracking-wide">{bid.label}</span>
                     </button>
                   )
                 })}
               </div>
             </div>
          )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default BiddingPanel
