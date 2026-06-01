import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

type PlayerProfileProps = {
  index: number
  isActive?: boolean
  position: 'bottom' | 'right' | 'top' | 'left'
  name: string
}

const playerAvatarColors = [
  'from-[#ff4b5c] to-[#ffb830]', // Vibrant Sunrise
  'from-[#00c9ff] to-[#92fe9d]', // Electric Lagoon
  'from-[#f857a6] to-[#ff5858]', // Raspberry Glaze
  'from-[#4776e6] to-[#8e54e9]', // Deep Purple Aura
]

const PlayerProfile = ({
  index,
  name,
  isActive = false,
  position,
}: PlayerProfileProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const positionStyles = {
    bottom: 'flex-row',
    right: 'flex-row',
    top: 'flex-row',
    left: 'flex-row',
  }

  useGSAP(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: 'back.out(1.4)',
      })
    }

    if (isActive && containerRef.current) {
      gsap.to(containerRef.current, {
        borderColor: 'rgba(245, 158, 11, 0.7)',
        boxShadow: '0 0 25px rgba(245, 158, 11, 0.45)',
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    } else if (containerRef.current) {
      gsap.killTweensOf(containerRef.current)
      // Reset to original styling bounds
      gsap.set(containerRef.current, {
        borderColor: '',
        boxShadow: '',
      })
    }
  }, { scope: containerRef, dependencies: [isActive] })

  return (
    <div
      ref={containerRef}
      className={`
        flex ${positionStyles[position]} items-center gap-2.5
        px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl
        border transition-all duration-300 select-none
        ${
          isActive
            ? 'bg-linear-to-br from-amber-500/20 via-amber-600/10 to-amber-800/20 dark:from-amber-400/15 dark:to-transparent border-amber-400/50 scale-105'
            : 'bg-white/10 dark:bg-slate-900/40 border-white/20 dark:border-slate-800/60 shadow-lg backdrop-blur-xl hover:bg-white/15 dark:hover:bg-slate-900/60'
        }
      `}
    >
      {/* Premium Avatar */}
      <div
        className={`relative shrink-0 rounded-full bg-linear-to-br ${playerAvatarColors[index]} shadow-md border-2 border-white/25 dark:border-white/15 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 text-white font-black text-sm tracking-wider uppercase select-none`}
      >
        {name.charAt(0) || '?'}
        
        {isActive && (
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-white dark:border-slate-800"></span>
          </span>
        )}
      </div>

      {/* Name Details */}
      <div className="flex flex-col items-start pr-1">
        <span
          className={`whitespace-nowrap font-sans text-xs font-bold leading-tight tracking-wide ${
            isActive
              ? 'text-amber-500 dark:text-amber-400 font-extrabold'
              : 'text-slate-800 dark:text-slate-200'
          }`}
        >
          {name}
        </span>
        {/* Active Turn text badge */}
        {isActive && (
          <span className="text-[9px] font-black text-amber-500/80 dark:text-amber-400/85 uppercase tracking-[0.1em] leading-none mt-0.5 animate-pulse">
            Thinking...
          </span>
        )}
      </div>
    </div>
  )
}

export default PlayerProfile

