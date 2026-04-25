import type { FC } from 'react'
import type { Player } from '@/types/models/Player.ts'

const PlayerBox: FC<{ player: Player }> = ({ player }) => {
  const getPlayerStatusText = (status: string): string => {
    const statusMap: Record<string, string> = {
      Disconnected: 'Disconnected',
      Connected: 'Connected',
      NotStable: 'Not Stable',
    }
    return statusMap[status] || 'Unknown'
  }

  const getStatusDotColor = (status: string): string => {
    const colorMap: Record<string, string> = {
      Disconnected: 'bg-red-500',
      Connected: 'bg-green-500',
      NotStable: 'bg-yellow-500',
    }
    return colorMap[status] || 'bg-gray-500'
  }

  // Use a placeholder if no image exists
  const avatarUrl = player.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=random&color=fff&size=128`

  return (
    <div className="group flex items-center justify-between p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-5">
        <div className="relative">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-xl h-16 w-16 ring-2 ring-primary/20"
            style={{
              backgroundImage: `url('${avatarUrl}')`,
            }}
          />
          <div
            className={`absolute -bottom-1 -right-1 border-2 border-white dark:border-slate-800 w-4 h-4 rounded-full ${getStatusDotColor(player.status)}`}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-charcoal dark:text-white text-lg font-bold">
            {player.name}
          </p>
          <span className="text-primary text-xs font-semibold uppercase tracking-tighter">
            {getPlayerStatusText(player.status)}
          </span>
        </div>
      </div>
      <div className="hidden group-hover:block">
        <span className="material-symbols-outlined text-slate-300">more_vert</span>
      </div>
    </div>
  )
}

export default PlayerBox
