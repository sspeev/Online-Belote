//hooks
import { useState, useEffect, useRef } from 'react'
import { useLobby } from '@/hooks/lobby/useLobby'
import { usePlayer } from '@/hooks/player/usePlayer'
import { useSignalR } from '@/hooks/common/useSignalR'
import { useIsMobile } from '@/hooks/common/useIsMobile'

//types
import Announces from '@/types/enums/Announces'
import { bids } from '@/constants/bids'

//animation
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

type PanelProps = {
  isMyTurn: boolean
}

const BiddingPanel = ({ isMyTurn }: PanelProps) => {
  const { lobbyData } = useLobby()
  const { playerData } = usePlayer()
  const { invoke } = useSignalR()
  const isMobile = useIsMobile()
  const [hasBid, setHasBid] = useState<boolean>(false)

  const panelRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!panelRef.current) return
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (prefersReduced) return

      gsap.fromTo(
        panelRef.current,
        { y: -30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.2)',
          clearProps: 'all',
        },
      )
    },
    { scope: panelRef },
  )
  useEffect(() => {
    const currentOffer = playerData.player.announceOffer
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
      const currentAnnounceType = lobbyData.game.currentAnnounce
      const isLowerThanClubs = currentAnnounceType < Announces.Clubs
      const passCounter = lobbyData.game.passCounter

      await invoke(
        'MakeBid',
        lobbyData.lobby.id,
        playerData.player.name,
        Announces[bid],
      )
      console.log('Bid submitted:', bid)

      if (isLowerThanClubs) {
        if (passCounter === 3) {
          console.log('4 Passes (No Bid) reached. Skipping round...')
          await invoke('SkipRound', lobbyData.lobby.id)
          return
        }
      } else {
        if (passCounter === 2) {
          console.log('3 Passes (After Bid) reached. Bidding ends.')
          await invoke('Gameplay', lobbyData.lobby.id)
          return
        }
      }
    } catch (err) {
      console.error('Failed to submit bid:', err)
      setHasBid(false)
    }
  }

  const isBidValid = (bid: Announces) => {
    if (bid === Announces.Pass) return true

    const currentAnnounceType = lobbyData.game.currentAnnounce
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

    const currentRank = currentAnnounceType
    const newRank = bid

    return newRank > currentRank
  }

  if (lobbyData.lobby.gamePhase !== 'bidding' || !isMyTurn || hasBid)
    return null

  return (
    <>
      <div
        ref={panelRef}
        className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full px-4 ${isMobile ? 'top-[25%] max-w-[95%]' : 'top-[35%] max-w-2xl'}`}
      >
        <div
          className={`flex flex-col gap-6 bg-white/40 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 transition-all duration-500 ${isMobile ? 'p-4' : 'p-8'}`}
        >
          {/* Header Status */}
          <div className="text-center space-y-2">
            <h2
              className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold bg-clip-text text-transparent bg-linear-to-r from-amber-600 to-amber-800`}
            >
              Your Bid
            </h2>
          </div>

          {/* Bidding Grid */}
          <div
            className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4 animate-in fade-in zoom-in duration-300`}
          >
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
                    <bid.icon
                      className={isMobile ? 'w-6 h-6' : 'w-10 h-10'}
                      fill="currentColor"
                    />
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
            <div
              className={`${isMobile ? 'col-span-2 grid-cols-2' : 'col-span-4 grid-cols-3'} grid gap-4 mt-2`}
            >
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
                    <span
                      className={`font-bold uppercase tracking-wide ${isMobile ? 'text-xs' : 'text-lg'}`}
                    >
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
