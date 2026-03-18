import { Club, Diamond, Heart, Spade } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLobby } from '@/hooks/useLobby.ts'
import { usePlayer } from '@/hooks/usePlayer'
import { useSignalR } from '@/hooks/useSignalR'
import Announces from '@/types/enums/Announces'
import { useIsMobile } from '@/hooks/useIsMobile'

type PanelProps = {
  isMyTurn: boolean
}

const getAnnounceType = (
  val: string | number | Announces | undefined | null,
): Announces => {
  if (val === undefined || val === null) return Announces.None
  if (typeof val === 'number') return val as Announces
  return Announces.None
}

const BiddingPanel = ({ isMyTurn }: PanelProps) => {
  const { lobbyData } = useLobby()
  const { playerData } = usePlayer()
  const { invoke } = useSignalR()
  const [hasBid, setHasBid] = useState(false)
  const isMobile = useIsMobile()

  // Reset local state when it becomes my turn again
  useEffect(() => {
    // Only reset if it IS my turn AND I haven't made a move yet (AnnounceOffer is None)
    // This prevents the panel form reappearing when game state (like passCounter) updates
    // but the backend hasn't rotated the turn yet.

    // Validate announceOffer value safely
    const currentOffer = getAnnounceType(playerData.player.announceOffer)

    if (isMyTurn && currentOffer === Announces.None) {
      setHasBid(false)
    }
  }, [
    isMyTurn,
    lobbyData.game.passCounter,
    lobbyData.game.currentAnnounce,
    playerData.player.announceOffer,
  ])

  const handleBid = async (bid: Announces) => {
    if (!isMyTurn) {
      console.error('Not your turn!')
      return
    }

    try {
      setHasBid(true)
      const currentAnnounceVal = lobbyData.game.currentAnnounce
      const currentAnnounceType = getAnnounceType(currentAnnounceVal)
      const isLowerThanClubs = currentAnnounceType < Announces.Clubs

      // Snapshot BEFORE invoke — BidMade may update lobbyData.game.passCounter
      // while we await, causing a race condition if we read it afterwards.
      const passCounterSnapshot = lobbyData.game.passCounter

      await invoke(
        'MakeBid',
        lobbyData.lobby.id,
        playerData.player.name,
        Announces[bid],
      )
      console.log('Bid submitted:', bid)

      if (bid === Announces.Pass) {
        if (isLowerThanClubs) {
          if (passCounterSnapshot === 3) {
            console.log('4 Passes (No Bid) reached. Skipping round...')
            await invoke('SkipRound', lobbyData.lobby.id)
            return
          }
        } else {
          if (passCounterSnapshot === 2) {
            console.log('3 Passes (After Bid) reached. Bidding ends.')
            await invoke('Gameplay', lobbyData.lobby.id)
            return
          }
        }
      }
    } catch (err) {
      console.error('Failed to submit bid:', err)
      setHasBid(false)
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
      type: Announces.Double,
      label: 'Double (X2)',
      color: 'bg-orange-100/80 text-orange-700 border-orange-400/50 font-bold',
    },
    {
      type: Announces.ReDouble,
      label: 'Redouble (X4)',
      color:
        'bg-red-100/80 text-red-700 border-red-500/50 font-black shadow-red-500/20',
    },
    {
      type: Announces.Pass,
      label: 'PASS',
      color: 'bg-gray-300/80 text-gray-700 border-gray-400/30 font-bold',
    },
  ]

  const getBidRank = (bid: Announces) => bid

  const isBidValid = (bid: Announces) => {
    if (bid === Announces.Pass) return true

    const currentAnnounceVal = lobbyData.game.currentAnnounce
    const currentAnnounceType = getAnnounceType(currentAnnounceVal)

    if (bid === Announces.Double) {
      if (
        currentAnnounceType === Announces.None ||
        currentAnnounceType === Announces.Double ||
        currentAnnounceType === Announces.ReDouble ||
        currentAnnounceType === Announces.Pass
      )
        return false

      if (lobbyData.game.isDoubled) return false

      // Check if we are on the opposing team of the contractPlayer
      if (!lobbyData.game.contractPlayer) return false
      const contractTeamIndex = lobbyData.game.teams.findIndex((t) =>
        t.players.some((p) => p.name === lobbyData.game.contractPlayer?.name),
      )
      const myTeamIndex = lobbyData.game.teams.findIndex((t) =>
        t.players.some((p) => p.name === playerData.player.name),
      )
      return contractTeamIndex !== -1 && contractTeamIndex !== myTeamIndex
    }

    if (bid === Announces.ReDouble) {
      if (!lobbyData.game.isDoubled || lobbyData.game.isReDoubled) return false

      // Check if we are on the SAME team as the contractPlayer
      if (!lobbyData.game.contractPlayer) return false
      const contractTeamIndex = lobbyData.game.teams.findIndex((t) =>
        t.players.some((p) => p.name === lobbyData.game.contractPlayer?.name),
      )
      const myTeamIndex = lobbyData.game.teams.findIndex((t) =>
        t.players.some((p) => p.name === playerData.player.name),
      )
      return contractTeamIndex !== -1 && contractTeamIndex === myTeamIndex
    }

    const currentRank = getBidRank(currentAnnounceType)
    const newRank = getBidRank(bid)

    return newRank > currentRank
  }

  if (lobbyData.lobby.gamePhase !== 'bidding' || !isMyTurn || hasBid)
    return null

  return (
    <>
      <div className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full px-4 ${isMobile ? 'top-[25%] max-w-[95%]' : 'top-[35%] max-w-2xl'}`}>
        <div className={`flex flex-col gap-6 bg-white/40 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 transition-all duration-500 ${isMobile ? 'p-4' : 'p-8'}`}>
          {/* Header Status */}
          <div className="text-center space-y-2">
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-800`}>
              Your Bid
            </h2>
          </div>

          {/* Bidding Grid */}
          <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4 animate-in fade-in zoom-in duration-300`}>
            {/* Suits Row */}
            {bids.slice(0, 4).map((bid) => {
              const valid = isBidValid(bid.type)
              return (
                <button
                  key={bid.type}
                  onClick={() => valid && handleBid(bid.type)}
                  disabled={!valid}
                  className={`
                    flex flex-col items-center justify-center gap-2
                    transition-all shadow-lg border-2 backdrop-blur-md ${bid.color}
                    ${isMobile ? 'h-14 rounded-xl' : 'aspect-square rounded-2xl'}
                    ${
                      valid
                        ? 'hover:scale-105 active:scale-95 hover:shadow-xl cursor-pointer'
                        : 'opacity-40 grayscale cursor-not-allowed scale-95 border-dashed'
                    }
                  `}
                >
                  {bid.icon && (
                    <bid.icon className={isMobile ? 'w-6 h-6' : 'w-10 h-10'} fill="currentColor" />
                  )}
                  {!isMobile && (
                    <span className="font-semibold capitalize">
                      {Announces[bid.type]}
                    </span>
                  )}
                </button>
              )
            })}

            {/* Special Bids Row (Spanning columns) */}
            <div className={`${isMobile ? 'col-span-2 grid-cols-2' : 'col-span-4 grid-cols-3'} grid gap-4 mt-2`}>
              {bids.slice(4).map((bid) => {
                const valid = isBidValid(bid.type)
                return (
                  <button
                    key={bid.type}
                    onClick={() => valid && handleBid(bid.type)}
                    disabled={!valid}
                    className={`
                      flex items-center justify-center gap-2
                      transition-all shadow-lg border-2 backdrop-blur-md ${bid.color}
                      ${isMobile ? 'h-12 rounded-lg' : 'h-16 rounded-xl'}
                      ${
                        valid
                          ? 'hover:scale-105 active:scale-95 hover:shadow-xl cursor-pointer'
                          : 'opacity-40 grayscale cursor-not-allowed scale-95 border-dashed'
                      }
                    `}
                  >
                    <span className={`font-bold uppercase tracking-wide ${isMobile ? 'text-xs' : 'text-lg'}`}>
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
