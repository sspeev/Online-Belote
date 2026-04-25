import { motion } from 'motion/react'

type PlayerProfileProps = {
  index: number
  isActive?: boolean
  position: 'bottom' | 'right' | 'top' | 'left'
  name: string
}

const playerAvatarColors = [
  'from-yellow-400 to-pink-500',
  'from-gray-400 to-indigo-500',
  'from-red-400 to-violet-500',
  'from-amber-400 to-orange-500',
]

const PlayerProfile = ({
  index,
  name,
  isActive = false,
  position,
}: PlayerProfileProps) => {
  const positionStyles = {
    bottom: 'flex-row',
    right: 'flex-col',
    top: 'flex-row',
    left: 'flex-col',
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        flex ${positionStyles[position]} items-center gap-1.5
        px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full
        bg-white/80 dark:bg-slate-800/80
        border border-slate-200 dark:border-slate-700
        shadow-sm backdrop-blur-md
        transition-all duration-300
        ${isActive ? 'ring-2 ring-green-400/60 shadow-green-400/20 shadow-md' : ''}
      `}
    >
      {/* Colour dot avatar */}
      <div
        className={`relative shrink-0 rounded-full bg-gradient-to-br ${playerAvatarColors[index]} shadow flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5`}
      >
        {isActive && (
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border border-white"
          />
        )}
      </div>

      {/* Name */}
      <span
        className={`whitespace-nowrap font-display text-xs font-medium leading-none ${
          isActive
            ? 'text-green-800 dark:text-green-300'
            : 'text-slate-700 dark:text-slate-200'
        }`}
      >
        {name}
      </span>
    </motion.div>
  )
}

export default PlayerProfile;
