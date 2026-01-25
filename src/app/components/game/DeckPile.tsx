import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import backSideCard from '@/assets/common/BackSide.png'
import { usePlayer } from '@/hooks/usePlayer.ts'
import { useSignalR } from '@/hooks/useSignalR.ts'
import { useLobby } from '@/hooks/useLobby.ts'

type DeckPileProps = {
  size: 'small' | 'normal'
  rotation: number
  onDealingComplete?: () => void
}


export function DeckPile({
  size = 'normal',
  rotation = 0,
  onDealingComplete,
}: DeckPileProps) {

  const { playerData } = usePlayer()
  const { lobbyData } = useLobby()
  const { invoke } = useSignalR()
  const [isAnimating, setIsAnimating] = useState(false)
  const [hasSplit, setHasSplit] = useState(false)

  const dimensions = size === 'small' ? 'w-22 h-35' : 'w-30 h-46'
  const totalCards = 32 // Total cards in the deck
  const splitPoint = Math.floor(totalCards / 2)
  const canSplit: boolean | undefined =
    lobbyData.game.currentPlayer?.name === playerData.player.name &&
    lobbyData.game.currentPlayer?.splitter

  const isDealing = lobbyData.lobby.gamePhase === 'dealing'
  const dealerIndex = lobbyData.game.sortedPlayers.findIndex((p) => p.dealer)
  
  // Animation states for dealing
  const [deckPosition, setDeckPosition] = useState({ x: 0, y: 0 })
  const [flyingCards, setFlyingCards] = useState<
    Array<{
      id: number
      targetIndex: number
      count: number
      delay: number
      startX: number
      startY: number
    }>
  >([])

  // Player positions relative to center (approximate)
  const playerPositions = [
    { x: 0, y: 300 }, // Bottom (Me)
    { x: 500, y: 0 }, // Right
    { x: 0, y: -300 }, // Top
    { x: -500, y: 0 }, // Left
  ]

  // Dealer deck positions (in front of player)
  const dealerPositions = [
    { x: 0, y: 140 }, // Front of Bottom
    { x: 200, y: 0 }, // Front of Right
    { x: 0, y: -140 }, // Front of Top
    { x: -200, y: 0 }, // Front of Left
  ]

  useEffect(() => {
    if (isDealing && dealerIndex !== -1) {
      startDealingAnimation()
    }
  }, [isDealing, dealerIndex])

  const startDealingAnimation = async () => {
    // 1. Move Deck to Dealer
    const targetDeckPos = dealerPositions[dealerIndex]
    setDeckPosition(targetDeckPos)

    // Wait for deck to move
    await new Promise((r) => setTimeout(r, 800))

    // 2. Prepare Flying Cards
    const newFlyingCards: typeof flyingCards = []
    let delay = 0

    const dealRound = (cardsCount: number) => {
      // Counter-clockwise: (Dealer + 1) ... (Dealer + 4) % 4
      for (let i = 1; i <= 4; i++) {
        const targetIdx = (dealerIndex + i) % 4
        newFlyingCards.push({
          id: Math.random(),
          targetIndex: targetIdx,
          count: cardsCount,
          delay: delay,
          startX: targetDeckPos.x,
          startY: targetDeckPos.y,
        })
        delay += 0.3 // Delay between players
      }
    }

    // Round 1: 3 cards
    dealRound(3)
    
    // Small pause between rounds
    delay += 0.5

    // Round 2: 2 cards
    dealRound(2)

    setFlyingCards(newFlyingCards)

    // 3. Finish
    setTimeout(() => {
      setFlyingCards([])
      setDeckPosition({ x: 0, y: 0 }) // Reset or keep? Reset for now as game proceeds
      onDealingComplete?.()
    }, delay * 1000 + 1000)
  }

  // Reset split state when it becomes possible to split (new round/turn)
  useEffect(() => {
    if (canSplit) {
      setHasSplit(false)
    }
  }, [canSplit])

  const handleDeckClick = async () => {
    if (!canSplit) return

    setIsAnimating(true)

    // Reset animation state after completion and maintain split visual
    setTimeout(() => {
      setIsAnimating(false)
      setHasSplit(true)
    }, 1200)

    await invoke(
      'DealingCards',
      playerData.player.lobbyId,
      lobbyData.game.sortedPlayers,
    )
  }

  return (
    <div
      className={`relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ${dimensions}`}
    >
      {/* Moving Deck Pile */}
      <motion.div
        className="relative w-full h-full cursor-pointer group"
        animate={
          isDealing ? { x: deckPosition.x, y: deckPosition.y } : { x: 0, y: 0 }
        }
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
                isAnimating
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
                zIndex: isAnimating
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

      {/* Flying Cards Animation */}
      {flyingCards.map((fc) => {
        const target = playerPositions[fc.targetIndex]
        return (
          <motion.div
            key={fc.id}
            className="absolute top-0 left-0 w-20 h-32 rounded-md bg-white border border-gray-300 shadow-md z-40"
            initial={{
              x: fc.startX,
              y: fc.startY,
              scale: 1,
              opacity: 1,
              rotate: 0,
            }}
            animate={{
              x: target.x,
              y: target.y,
              scale: 0.8,
              opacity: 0, // Fade out as they reach hand
              rotate: 360, // Spin effect
            }}
            transition={{
              duration: 0.8,
              delay: fc.delay,
              ease: 'easeInOut',
            }}
          >
            <img
              src={backSideCard}
              alt="card-back"
              className="w-full h-full object-cover rounded-md"
            />
            {/* Count Badge */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
              {fc.count}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
