import { useState } from 'react'
import { motion } from 'motion/react'
import backSideCard from '@/assets/common/BackSide.png'
import { usePlayer } from '@/hooks/usePlayer.ts'

type DeckPileProps = {
  size: 'small' | 'normal'
  rotation: number
}

export function DeckPile({ size, rotation }: DeckPileProps) {
  const { playerData } = usePlayer()
  const [isAnimating, setIsAnimating] = useState(false)
  const dimensions = size === 'small' ? 'w-22 h-35' : 'w-30 h-46'
  const totalCards = 32 // Total cards in the deck
  const splitPoint = Math.floor(totalCards / 2)

  const handleDeckClick = () => {
    if (playerData.player.splitter) {
      setIsAnimating(true)

      // Reset animation state after completion
      setTimeout(() => {
        setIsAnimating(false)
      }, 1200)
    }
  }

  return (
    <div
      className={`relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ${dimensions} cursor-pointer group`}
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
            className="absolute top-0 left-0 w-full h-full rounded-sm overflow-hidden shadow-lg"
            initial={{
              y: baseOffset,
              x: baseOffset * 0.2,
              rotate: index * 0.1,
            }}
            animate={
              isAnimating
                ? isBottomHalf
                  ? {
                      // Bottom half moves up and to the side, then to top
                      y: [
                        baseOffset,
                        baseOffset - 60,
                        (splitPoint + cardPositionInHalf) * 0.3,
                      ],
                      x: [
                        baseOffset * 0.2,
                        baseOffset * 0.2 - 40,
                        (splitPoint + cardPositionInHalf) * 0.3 * 0.2,
                      ],
                      rotate: [
                        index * 0.1,
                        index * 0.1 - 15,
                        (splitPoint + cardPositionInHalf) * 0.1,
                      ],
                    }
                  : {
                      // Top half stays, then moves to bottom position
                      y: [
                        baseOffset,
                        baseOffset + 20,
                        cardPositionInHalf * 0.3,
                      ],
                      x: [
                        baseOffset * 0.2,
                        baseOffset * 0.2 + 20,
                        cardPositionInHalf * 0.3 * 0.2,
                      ],
                      rotate: [
                        index * 0.1,
                        index * 0.1 + 5,
                        cardPositionInHalf * 0.1,
                      ],
                    }
                : {
                    y: baseOffset,
                    x: baseOffset * 0.2,
                    rotate: index * 0.1,
                  }
            }
            transition={{
              duration: 0.8,
              ease: [0.4, 0.0, 0.2, 1],
              times: [0, 0.5, 1],
            }}
            style={{
              zIndex: isAnimating ? (isBottomHalf ? 100 : 0) : index,
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
        Click to split
      </motion.div>
    </div>
  )
}
