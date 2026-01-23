import LiquidGlass from '@nkzw/liquid-glass'
import type { FC } from 'react'
import type { Player } from '@/types/models/Player.ts'
import { usePlayer } from '@/hooks/usePlayer.ts'

const PlayerBox: FC<{ player: Player }> = ({ player }) => {

  const { playerData } = usePlayer()

  const hoster = playerData.player == player && playerData.player.hoster
  const getPlayerStatusText = (status: string): string => {
    const statusMap: Record<string, string> = {
      0: 'Disconnected',
      1: 'Connected',
      2: 'Not Stable'
    }
    return statusMap[status] || 'Unknown'
  }

  const getStatusClassName = (status: string): string => {
    const classMap: Record<string, string> = {
      0: 'text-red-300',
      1: 'text-green-300',
      2: 'text-yellow-300'
    }
    return classMap[status] || 'text-gray-300'
  }

  return (
    <article className="">
      <LiquidGlass borderRadius={40}>
        <div className="player-box w-15 h-10 lg:w-52 lg:h-15 flex flex-col gap-2 lg:gap-0 items-center justify-center p-4 m-4">
          <span className="text-white text-center text-sm lg:text-xl font-semibold">
            {player.name}
            {hoster && (<span className="ml-2 text-sm text-yellow-300 font-semibold">Host</span>)}
          </span>
          <span className={`${getStatusClassName(player.status)} text-sm lg:text-xl font-semibold`}>
            {getPlayerStatusText(player.status)}
          </span>
        </div>
      </LiquidGlass>
    </article>
  )
}

export default PlayerBox
