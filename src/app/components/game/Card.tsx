
import { Diamond, Heart, Club, Spade } from 'lucide-react';

type Card = {
  id: number;
  suit: string;
  value: string;
  color: string;
  power: number;
};

type GameCardProps = {
  card: Card;
  onClick?: () => void;
  isClickable?: boolean;
  isOpponent?: boolean;
  size?: 'small' | 'normal';
  rotation?: number;
};

const suitIcons = {
  diamond: Diamond,
  heart: Heart,
  club: Club,
  spade: Spade,
};

const suitColors = {
  diamond: 'text-neutral-600',
  heart: 'text-neutral-600',
  club: 'text-neutral-700',
  spade: 'text-neutral-700',
};

export function Card({ card, onClick, isClickable = false, isOpponent = false, size = 'normal', rotation = 0 }: GameCardProps) {
  const Icon = suitIcons[card.suit as keyof typeof suitIcons] || Diamond;
  const iconColor = suitColors[card.suit as keyof typeof suitColors] || 'text-neutral-600';
  const dimensions = size === 'small' ? 'w-20 h-28' : 'w-28 h-40';
  const iconSize = size === 'small' ? 'w-10 h-10' : 'w-16 h-16';
  const valueSize = size === 'small' ? 'text-lg' : 'text-2xl';
  const smallIconSize = size === 'small' ? 'w-4 h-4' : 'w-5 h-5';

  // Show card back for opponents
  if (isOpponent) {
    return (
      <div
        // whileHover={isClickable ? { scale: 1.05, y: -5 } : {}}
        // whileTap={isClickable ? { scale: 0.95 } : {}}
        onClick={onClick}
        className={`
          relative ${dimensions} rounded-xl overflow-hidden
          ${isClickable ? 'cursor-pointer' : ''}
        `}
      >
        {/* Card back background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 shadow-xl">
          {/* Pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px),
                repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)
              `,
            }}
          />

          {/* Decorative center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-blue-300/30 rounded-full" />
            <div className="absolute w-12 h-12 border-4 border-blue-300/20 rounded-full" />
          </div>
        </div>

        {/* Glass border */}
        <div className="absolute inset-0 rounded-xl border border-blue-400/30 shadow-inner" />
        <div className="absolute inset-0 rounded-xl border-2 border-blue-900/40" />
      </div>
    );
  }

  return (
    <div
      // whileHover={isClickable ? { scale: 1.05, y: -5 } : {}}
      // whileTap={isClickable ? { scale: 0.95 } : {}}
      onClick={onClick}
      className={`
        relative ${dimensions} rounded-xl overflow-hidden
        ${isClickable ? 'cursor-pointer' : ''}
      `}
      style={{ rotate: `${rotation}deg` }}
    >
      {/* Liquid glass card background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/50 to-white/30 backdrop-blur-xl shadow-2xl">
        {/* Inner frosted layer */}
        <div className="absolute inset-[2px] bg-gradient-to-br from-white/40 via-white/20 to-white/10 rounded-lg backdrop-blur-sm">
          {/* Subtle texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 10px 10px, rgba(0,0,0,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          />

          {/* Soft gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-100/30 via-transparent to-neutral-200/20" />

          {/* Glass shine */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-60" />
        </div>
      </div>

      {/* Card content */}
      <div className="relative z-10 h-full flex flex-col p-3">
        {/* Top corner */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col items-center">
            <span className={`${valueSize} ${iconColor}`}>{card.value}</span>
            <Icon className={`${smallIconSize} mt-0.5 ${iconColor}`} fill="currentColor" />
          </div>
          {size === 'normal' && (
            <div className="px-2 py-0.5 rounded-md bg-neutral-600/20 backdrop-blur-sm border border-neutral-400/30">
              <span className="text-xs text-neutral-700">{card.power}</span>
            </div>
          )}
        </div>

        {/* Center icon */}
        <div className="flex-1 flex items-center justify-center">
          <div

          >
            <Icon className={`${iconSize} ${iconColor} opacity-80`} fill="currentColor" />
          </div>
        </div>

        {/* Bottom corner (upside down) */}
        <div className="flex items-end justify-end rotate-180">
          <div className="flex flex-col items-center">
            <span className={`${valueSize} ${iconColor}`}>{card.value}</span>
            <Icon className={`${smallIconSize} mt-0.5 ${iconColor}`} fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Glass border */}
      <div className="absolute inset-0 rounded-xl border border-white/60 shadow-inner" />

      {/* Outer glow border */}
      <div className="absolute inset-0 rounded-xl border-2 border-neutral-300/20" />

      {/* Hover effect */}
      {isClickable && (
        <div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-neutral-400/0 to-neutral-400/0"
          // whileHover={{
          //   background: 'linear-gradient(to bottom right, rgba(163, 163, 163, 0.1), rgba(163, 163, 163, 0.05))'
          // }}
        />
      )}
    </div>
  );
}