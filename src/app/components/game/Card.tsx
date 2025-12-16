
import { Diamond, Heart, Club, Spade } from 'lucide-react';
import backSideCard from '@/assets/common/BackSide.png';

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
  size: 'small' | 'normal';
  rotation: number;
};

const suitIcons = {
  diamond: Diamond,
  heart: Heart,
  club: Club,
  spade: Spade,
};

const suitColors = {
  diamond: 'text-red-600',
  heart: 'text-red-600',
  club: 'text-neutral-700',
  spade: 'text-neutral-700',
};

export function Card({ card, onClick, isClickable = false, isOpponent = false, size, rotation }: GameCardProps) {
  const Icon = suitIcons[card.suit as keyof typeof suitIcons] || Diamond;
  const iconColor = suitColors[card.suit as keyof typeof suitColors] || 'text-neutral-600';
  const dimensions = size === 'small' ? 'w-20 h-28' : 'w-28 h-40';
  const iconSize = size === 'small' ? 'w-10 h-10' : 'w-16 h-16';
  const valueSize = size === 'small' ? 'text-lg' : 'text-2xl';
  const smallIconSize = size === 'small' ? 'w-4 h-4' : 'w-5 h-5';

  // Show card back for opponents
  if (isOpponent) {
    return (
      <div className={`relative ${dimensions} rounded-xl overflow-hidden`}
           style={{ transform: `rotate(${rotation}deg)` }}
           onClick={onClick}
      >
        <img src={backSideCard} />
        <div className="absolute inset-0 rounded-xl border border-black shadow-xl" />
        <div className="absolute inset-0 rounded-xl border-2 border-red-100-900/40" />
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`
        relative ${dimensions} rounded-xl overflow-hidden
        ${isClickable ? 'cursor-pointer' : ''}
      `}
      style={{ transform: `rotate(${rotation}deg)` }}
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
      {/*{isClickable && (*/}
      {/*  <div*/}
      {/*    className="absolute inset-0 rounded-xl bg-gradient-to-br from-neutral-400/0 to-neutral-400/0 hover:bg-neutral-400/10 transition-colors opacity-0"*/}
      {/*    */}
      {/*  />*/}
      {/*)}*/}
    </div>
  );
}