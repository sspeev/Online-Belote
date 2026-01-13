import { Heart, Diamond, Club, Spade } from 'lucide-react';

const suits = [Heart, Diamond, Club, Spade];
const suitColors = ['text-red-900/20', 'text-orange-900/20', 'text-neutral-800/20', 'text-neutral-900/20'];

export function AnimatedBackground() {
    return (
        <div className="fixed inset-0 z-0">
            {/* Beige gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-100 via-orange-50 to-stone-200" />

            {/* Clouds */}
            <div
                className="absolute w-64 h-24 rounded-full bg-white/40 blur-2xl"


                style={{ top: '10%' }}
            />

            <div
                className="absolute w-80 h-28 rounded-full bg-white/30 blur-2xl"

                style={{ top: '20%' }}
            />

            <div
                className="absolute w-72 h-20 rounded-full bg-white/35 blur-2xl"

                style={{ top: '15%' }}
            />

            {/* Soft sun glow */}
            <div className="absolute top-20 right-32 w-40 h-40 rounded-full bg-amber-200/40 blur-3xl" />
            <div className="absolute top-24 right-36 w-32 h-32 rounded-full bg-yellow-200/30 blur-2xl" />

            {/* Falling card suits */}
            {Array.from({ length: 15 }).map((_, i) => {
                const SuitIcon = suits[i % 4];
                const colorClass = suitColors[i % 4];

                return (
                    <div
                        key={i}
                        className={`absolute ${colorClass}`}

                    >
                        <SuitIcon className="w-6 h-6" fill="currentColor" />
                    </div>
                );
            })}

            {/* Birds */}
            {Array.from({ length: 3 }).map((_, i) => (
                <div
                    key={`bird-${i}`}
                    className="absolute text-2xl"
                    style={{ top: `${10 + i * 8}%` }}

                >
                    <span className="text-stone-600/30 text-sm">∼</span>
                </div>
            ))}

            {/* Warm light rays effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-200/10 via-transparent to-transparent pointer-events-none" />

            {/* Atmospheric depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-300/20 via-transparent to-amber-100/10" />
        </div>
    );
}