import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import backSideCard from '@/assets/common/BackSide.png'
import { usePlayer } from '@/hooks/usePlayer.ts'
import { useSignalR } from '@/hooks/useSignalR.ts'
import { useLobby } from '@/hooks/useLobby.ts'

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
  const splitPoint = Math.floor(totalCards / 2)
  const canSplit: boolean | undefined =
    lobbyData.game.currentPlayer.name === playerData.player.name

  useEffect(() => {
    if (canSplit) {
      setDeckState('idle')
    }
  }, [canSplit])

  useEffect(() => {
    if (lobbyData.lobby.gamePhase === 'dealing' && deckState === 'idle') {
      setDeckState('split')
    }
  }, [lobbyData.lobby.gamePhase, deckState])

  // Animate the deck split with GSAP
  useGSAP(() => {
    if (deckState !== 'splitting') return

    cardRefs.current.forEach((cardEl, index) => {
      if (!cardEl) return

      const isBottomHalf = index < splitPoint
      const cardPositionInHalf = isBottomHalf ? index : index - splitPoint
      const baseOffset = index * 0.3

      if (isBottomHalf) {
        // Bottom half lifts up, moves left, lands on top
        gsap.to(cardEl, {
          keyframes: [
            {
              y: baseOffset - 100,
              x: baseOffset * 0.2 - 60,
              rotation: index * 0.1 - 10,
              zIndex: index + 50,
              duration: 0.55,
            },
            {
              y: (splitPoint + cardPositionInHalf) * 0.3,
              x: (splitPoint + cardPositionInHalf) * 0.3 * 0.2,
              rotation: (splitPoint + cardPositionInHalf) * 0.1,
              zIndex: index + 50,
              duration: 0.55,
            },
          ],
          ease: 'power2.inOut',
          onComplete: () => {
            if (index === splitPoint - 1) {
              setDeckState('split')
            }
          },
        })
      } else {
        // Top half moves right, slides under
        gsap.to(cardEl, {
          keyframes: [
            {
              y: baseOffset + 40,
              x: baseOffset * 0.2 + 140,
              rotation: index * 0.1 + 10,
              zIndex: index,
              duration: 0.55,
            },
            {
              y: cardPositionInHalf * 0.3,
              x: cardPositionInHalf * 0.3 * 0.2,
              rotation: cardPositionInHalf * 0.1,
              zIndex: index - 20,
              duration: 0.55,
            },
          ],
          ease: 'power2.inOut',
        })
      }
    })
  }, { dependencies: [deckState] })

  const handleDeckClick = async () => {
    if (!canSplit) {
      console.warn('Cannot split: Not your turn or not splitter')
      return
    }

    setDeckState('splitting')

    try {
      await invoke(
        'DealingCards',
        lobbyData.lobby.id,
        lobbyData.game.sortedPlayers,
      )
      console.log('Invoked DealingCards')
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
              ref={(el) => { cardRefs.current[index] = el }}
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
        <div
          className="absolute -inset-2 rounded-2xl border-2 border-amber-400/0 group-hover:border-amber-400/40 group-hover:scale-[1.02] pointer-events-none transition-all duration-200"
        />

        {/* Click hint text */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {`Waiting for ${lobbyData.game.currentPlayer.name} to split cards`}
        </div>
      </div>
    </div>
  )
}
