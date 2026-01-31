import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
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
  const [isSplitting, setIsSplitting] = useState(false)
  const [hasSplit, setHasSplit] = useState(false)

  const dimensions = size === 'small' ? 'w-22 h-35' : 'w-30 h-46'
  const totalCards = 20 // Total cards in the deck
  const splitPoint = Math.floor(totalCards / 2)
  const canSplit: boolean | undefined =
    lobbyData.game.currentPlayer?.name === playerData.player.name &&
    lobbyData.game.currentPlayer?.splitter

  //const isDealing = lobbyData.lobby.gamePhase === 'dealing'
  const dealerIndex = lobbyData.game.sortedPlayers.findIndex((p) => p.dealer)

  const dealerPositions = [
    { x: 0, y: 180 }, // Front of Bottom
    { x: 100, y: 0 }, // Front of Right
    { x: 0, y: -180 }, // Front of Top
    { x: -100, y: 0 }, // Front of Left
  ]

  const [deckPosition, setDeckPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (canSplit) {
      setHasSplit(false)
    }
  }, [canSplit])

  const handleDeckClick = async () => {
    if (!canSplit) return

    console.log(
      '🃏 Deck clicked! Current player:',
      lobbyData.game.currentPlayer?.name,
    )
    console.log('🃏 Sorted players:', lobbyData.game.sortedPlayers)

    setIsSplitting(true)

    // Reset animation state after completion and maintain split visual
    setTimeout(() => {
      setIsSplitting(false)
      setHasSplit(true)
    }, 1200)

    await invoke(
      'DealingCards',
      playerData.player.lobbyId,
      lobbyData.game.sortedPlayers,
    )
    console.log('🃏 Deck click complete, DealingCards invoked')
    setDeckPosition(dealerPositions[dealerIndex])
  }

  return (
    <div
      className={`DECK relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ${dimensions}`}
    >
      {/* Moving Deck Pile */}
      <motion.div
        className="relative w-full h-full cursor-pointer group"
        animate={{ x: deckPosition.x, y: deckPosition.y }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        onClick={handleDeckClick}
      >
        {/* Cards in deck */}
        {Array.from({ length: totalCards }).map((_, index) => {
          // Determine if this card is in the top or bottom half
          const isBottomHalf = index < splitPoint
          const cardPositionInHalf = isBottomHalf ? index : index - splitPoint

          // Calculate base offset for stacking effect
          const baseOffset = index * 0.3

          return (
            <motion.div
              key={index}
              className="absolute top-0 left-0 w-full h-full rounded-sm overflow-hidden shadow-lg"
              initial={{
                y: baseOffset,
                x: baseOffset * 0.2,
                rotate: index * 0.1,
                zIndex: index,
              }}
              animate={
                isSplitting
                  ? isBottomHalf
                    ? {
                        // Bottom half (becoming Top): Lifts HIGH, moves LEFT, lands on Top
                        y: [
                          baseOffset,
                          baseOffset - 100, // Lift high
                          (splitPoint + cardPositionInHalf) * 0.3,
                        ],
                        x: [
                          baseOffset * 0.2,
                          baseOffset * 0.2 - 60, // Move left to clear space
                          (splitPoint + cardPositionInHalf) * 0.3 * 0.2,
                        ],
                        rotate: [
                          index * 0.1,
                          index * 0.1 - 10,
                          (splitPoint + cardPositionInHalf) * 0.1,
                        ],
                        zIndex: [index, index + 50, index + 50],
                      }
                    : {
                        // Top half (becoming Bottom): Moves RIGHT, stays LOW, slides under
                        y: [
                          baseOffset,
                          baseOffset + 40, // Move down visually
                          cardPositionInHalf * 0.3,
                        ],
                        x: [
                          baseOffset * 0.2,
                          baseOffset * 0.2 + 140, // Move far right
                          cardPositionInHalf * 0.3 * 0.2,
                        ],
                        rotate: [
                          index * 0.1,
                          index * 0.1 + 10,
                          cardPositionInHalf * 0.1,
                        ],
                        zIndex: [index, index, index - 20],
                      }
                  : hasSplit
                    ? isBottomHalf
                      ? {
                          // Was Bottom, now Top (Resting State)
                          y: (splitPoint + cardPositionInHalf) * 0.3,
                          x: (splitPoint + cardPositionInHalf) * 0.3 * 0.2,
                          rotate: (splitPoint + cardPositionInHalf) * 0.1,
                          zIndex: index + 50,
                        }
                      : {
                          // Was Top, now Bottom (Resting State)
                          y: cardPositionInHalf * 0.3,
                          x: cardPositionInHalf * 0.3 * 0.2,
                          rotate: cardPositionInHalf * 0.1,
                          zIndex: index - 20,
                        }
                    : {
                        // Original State
                        y: baseOffset,
                        x: baseOffset * 0.2,
                        rotate: index * 0.1,
                        zIndex: index,
                      }
              }
              transition={{
                duration: 1.1,
                ease: 'easeInOut',
                times: [0, 0.5, 1],
              }}
              style={{
                zIndex: isSplitting
                  ? undefined
                  : hasSplit
                    ? isBottomHalf
                      ? index + 50
                      : index - 20
                    : index,
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
            </motion.div>
          )
        })}

        {/* Hover indicator */}
        <motion.div
          className="absolute -inset-2 rounded-2xl border-2 border-amber-400/0 pointer-events-none"
          whileHover={{
            borderColor: 'rgba(251, 191, 36, 0.4)',
            scale: 1.02,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Click hint text */}
        <motion.div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {`Waiting for ${lobbyData.game.currentPlayer?.name} to split cards`}
        </motion.div>
      </motion.div>
    </div>
  )
}
