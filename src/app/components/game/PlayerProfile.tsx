import UserLight from '@/assets/svgs/UserLight.svg'
import { motion } from 'motion/react'

type PlayerProfileProps = {
  index: number
  isActive: boolean
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
  isActive,
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
        flex ${positionStyles[position]} items-center gap-3 px-4 py-3 rounded-2xl
        ${isActive ? 'bg-emerald-600/30 border-2 border-emerald-400/60 shadow-lg shadow-emerald-500/20' : 'bg-white/50 border-2 border-white/60'}
        backdrop-blur-xl transition-all duration-300
      `}
    >
      {/* Avatar */}
      <div
        className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${playerAvatarColors[index]} shadow-lg flex items-center justify-center`}
      >
        <img src={UserLight} width={25} height={25} alt={'Avatar'} />
        {isActive && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"></motion.div>
        )}
      </div>

      {/* Player Info */}
      <div
        className={`flex ${position === 'right' || position === 'left' ? 'flex-col items-center' : 'flex-col'}`}
      >
        <span
          className={`${isActive ? 'text-emerald-900' : 'text-neutral-700'} whitespace-nowrap font-default text-sm font-semibold`}
        >
          {name}
        </span>
      </div>
    </motion.div>
  )
}

export default PlayerProfile;
