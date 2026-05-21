import { useState, useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import backSideCard from '@/assets/common/BackSide.png'
import { usePlayer } from '@/hooks/player/usePlayer'
import { useSignalR } from '@/hooks/common/useSignalR'
import { useLobby } from '@/hooks/lobby/useLobby'

type DeckPileProps = {
  size: 'small' | 'normal'
  rotation: number
}

export function DeckPile({ size = 'normal', rotation = 0 }: DeckPileProps) {
  const { playerData } = usePlayer()
  const { lobbyData } = useLobby()
  const { invoke } = useSignalR()
  const [deckState, setDeckState] = useState<'idle' | 'splitting' | 'split'>(
    'idle',
  )
  const deckRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const dimensions = size === 'small' ? 'w-22 h-35' : 'w-30 h-46'
  const totalCards = 20 // Total cards in the deck
  const canSplit =
    lobbyData.lobby.gamePhase === 'splitting' &&
    lobbyData.game.currentPlayer.name.toLowerCase() ===
      playerData.player.name.toLowerCase()

  useEffect(() => {
    if (lobbyData.lobby.gamePhase === 'dealing') {
      setDeckState('split')
    }
  }, [lobbyData.lobby.gamePhase])

  // Animation removed for troubleshooting
  useGSAP(() => {}, { dependencies: [deckState] })

  const handleDeckClick = async () => {
    if (!canSplit) {
      console.warn('Cannot split: Not your turn or not splitter')
      return
    }

    try {
      await invoke(
        'DealingCards',
        lobbyData.lobby.id,
        lobbyData.game.sortedPlayers.map((p: any) => ({
          name: p.name,
          connectionId: p.connectionId,
          sessionId: p.sessionId,
          lobbyId: p.lobbyId,
          hoster: p.hoster,
          status: p.status,
          hand: [],
          announceOffer: p.announceOffer,
        })),
      )
      console.log('Invoked DealingCards')
      setDeckState('split')
    } catch (error) {
      console.error('Failed to invoke DealingCards:', error)
    }
  }

  if (deckState === 'split') return null

  return (
    <div
      ref={deckRef}
      className={`DECK relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ${dimensions}`}
    >
      <div
        className="relative w-full h-full cursor-pointer group"
        onClick={handleDeckClick}
      >
        {Array.from({ length: totalCards }).map((_, index) => {
          const baseOffset = index * 0.3

          return (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              className="absolute top-0 left-0 w-full h-full rounded-sm overflow-hidden shadow-lg"
              style={{
                transform: `translateY(${baseOffset}px) translateX(${baseOffset * 0.2}px) rotate(${index * 0.1}deg)`,
                zIndex: index,
              }}
            >
              {/* Card back background */}
              <div
                className={`relative ${dimensions} rounded-md overflow-hidden`}
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <img src={backSideCard} alt={'backSideCard'} />
                <div className="absolute inset-0 border-4 border-white shadow-xl" />
              </div>
              {/* Glass border */}
              <div className="absolute inset-0 rounded-xl border border-amber-200/40 shadow-inner" />
              <div className="absolute inset-0 rounded-xl border-2 border-stone-300/30" />
            </div>
          )
        })}

        {/* Hover indicator */}
        <div className="absolute -inset-2 rounded-2xl border-2 border-amber-400/0 group-hover:border-amber-400/40 group-hover:scale-[1.02] pointer-events-none transition-all duration-200" />

        {/* Click hint text */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 whitespace-nowrap text-xs transition-opacity pointer-events-none">
          <span className="text-white/60">
            {`Current Turn: ${lobbyData.game.currentPlayer.name || 'Unknown'}`}
          </span>
          <span className="text-white/40">
            {`You are: ${playerData.player.name || 'Anonymous'}`}
          </span>
          {canSplit && (
            <span className="text-amber-400 font-bold animate-pulse mt-1">
              Click to Split!
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
