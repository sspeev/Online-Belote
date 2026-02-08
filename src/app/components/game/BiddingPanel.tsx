import { Club, Diamond, Heart, Spade } from 'lucide-react'
import { useLobby } from '@/hooks/useLobby.ts'
import { usePlayer } from '@/hooks/usePlayer'
import { useSignalR } from '@/hooks/useSignalR'
import Announces from '@/types/enums/Announces'

const BiddingPanel = () => {
  const { lobbyData } = useLobby()
  const { playerData } = usePlayer()
  const { invoke } = useSignalR()

  const handleBid = async (bid: Announces) => {
    if (
      !lobbyData.game.currentPlayer ||
      lobbyData.game.currentPlayer.name !== playerData.player.name
    ) {
      console.warn('Not your turn!')
      return
    }

    try {
      await invoke('MakeBid', lobbyData.lobby.id, playerData.player.name, bid.toString())
      console.log('Bid submitted:', bid)
    } catch (err) {
      console.error('Failed to submit bid:', err)
    }
  }

  const bids: {
    type: Announces
    icon?: typeof Club
    fill?: string
    label?: string
    color: string
  }[] = [
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
    {
      type: Announces.Pass,
      label: 'PASS',
      color: 'bg-gray-300/80 text-gray-700 border-gray-400/30 font-bold',
    },
  ]

  /* Logic for bid validation */
  const BID_HIERARCHY: Record<Announces, number> = {
    [Announces.None]: 0,
    [Announces.Pass]: 1,
    [Announces.Clubs]: 2,
    [Announces.Diamonds]: 3,
    [Announces.Hearts]: 4,
    [Announces.Spades]: 5,
    [Announces.NoTrump]: 6,
    [Announces.AllTrumps]: 7,
  }

  const getBidRank = (bid: Announces) => BID_HIERARCHY[bid] || 0

  const isBidValid = (bid: Announces) => {
    if (bid === Announces.Pass) return true
    const currentAnnounce = lobbyData.game.currentAnnounce

    // Must be higher than current announce
    return getBidRank(bid) > getBidRank(currentAnnounce)
  }

  const currentPlayerName = lobbyData.game.currentPlayer?.name
  const isMyTurn = currentPlayerName === playerData.player.name

  if (lobbyData.lobby.gamePhase !== 'bidding' || !isMyTurn) return null

  return (
    <>
      <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl px-4">
        <div className="flex flex-col gap-6 bg-white/40 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 p-8 transition-all duration-500">
          {/* Header Status */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-800">
              Your Bid
            </h2>
          </div>

          {/* Bidding Grid */}
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
                    ${
                      valid
                        ? 'hover:scale-105 active:scale-95 hover:shadow-xl cursor-pointer'
                        : 'opacity-40 grayscale cursor-not-allowed scale-95 border-dashed'
                    }
                  `}
                >
                  {bid.icon && (
                    <bid.icon className="w-10 h-10" fill="currentColor" />
                  )}
                  <span className="font-semibold capitalize">
                    {Announces[bid.type]}
                  </span>
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
                      ${
                        valid
                          ? 'hover:scale-105 active:scale-95 hover:shadow-xl cursor-pointer'
                          : 'opacity-40 grayscale cursor-not-allowed scale-95 border-dashed'
                      }
                    `}
                  >
                    <span className="font-bold text-lg uppercase tracking-wide">
                      {bid.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BiddingPanel
