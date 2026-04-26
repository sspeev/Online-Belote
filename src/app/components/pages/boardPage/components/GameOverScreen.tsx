import type { Team } from '@/types/models/Team'
import { Crown, LogOut, Trophy } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useSignalR } from '@/hooks/useSignalR.ts'
import { useLobby } from '@/hooks/useLobby.ts'
import { usePlayer } from '@/hooks/usePlayer.ts'

interface GameOverScreenProps {
  teams: Team[]
}

export function GameOverScreen({ teams }: GameOverScreenProps) {
  const navigate = useNavigate()
  const { invoke } = useSignalR()
  const { lobbyData } = useLobby()
  const { playerData } = usePlayer()

  // Determine the winner (The one with 151+ and higher score than opponents)
  const winningTeam = teams.reduce((prev, current) =>
    prev.score > current.score ? prev : current,
  )

  const handleLeaveLobby = async () => {
    try {
      if (
        playerData.player.name &&
        lobbyData.lobby.id &&
        playerData.player.name !== ''
      ) {
        await invoke('LeaveLobby', {
          LobbyId: lobbyData.lobby.id,
          PlayerName: playerData.player.name,
        })
      }
    } catch (e) {
      console.error('Logout error:', e)
    } finally {
      await navigate({ to: '/' })
    }
  }

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 min-h-screen bg-black/80 backdrop-blur-sm">
      <div className="bg-stone-900 border border-stone-700/50 rounded-3xl p-8 md:p-12 w-full max-w-2xl shadow-2xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-amber-500/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-amber-500/10 p-4 rounded-full mb-6 relative group">
            <Trophy className="w-16 h-16 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] transform group-hover:scale-110 transition-transform duration-300" />
            <Crown className="w-8 h-8 text-yellow-300 absolute -top-2 -right-2 transform rotate-12 drop-shadow-lg" />
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-yellow-400 to-amber-200 mb-2 uppercase tracking-wider text-center drop-shadow-sm">
            Game Over!
          </h2>
          <p className="text-stone-400 text-lg mb-8 font-medium">
            Final Results
          </p>

          <div className="w-full space-y-4 mb-10">
            {teams
              .sort((a, b) => b.score - a.score)
              .map((team, index) => {
                const isWinner = team === winningTeam

                return (
                  <div
                    key={index}
                    className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${
                      isWinner
                        ? 'bg-linear-to-r from-amber-500/20 to-orange-500/10 border-2 border-amber-500/50 shadow-[0_0_30px_rgba(251,191,36,0.15)]'
                        : 'bg-stone-800/80 border border-stone-700/50'
                    }`}
                  >
                    {isWinner && (
                      <div className="absolute right-0 top-0 w-32 h-full bg-linear-to-l from-amber-500/20 to-transparent skew-x-12 translate-x-10" />
                    )}

                    <div className="flex justify-between items-center relative z-10">
                      <div className="flex flex-col">
                        <span
                          className={`text-sm font-semibold uppercase tracking-wider mb-1 ${
                            isWinner ? 'text-amber-400' : 'text-stone-400'
                          }`}
                        >
                          {isWinner ? '👑 Champions' : 'Team'}
                        </span>
                        <span className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                          {team.players.map((p) => p.name).join(' & ')}
                        </span>
                      </div>

                      <div className="text-right">
                        <span
                          className={`text-4xl md:text-5xl font-black font-mono ${
                            isWinner
                              ? 'text-transparent bg-clip-text bg-linear-to-b from-amber-200 to-amber-500 drop-shadow-sm'
                              : 'text-stone-300'
                          }`}
                        >
                          {team.score}
                        </span>
                        <span
                          className={`text-sm ml-2 font-medium ${
                            isWinner ? 'text-amber-500/80' : 'text-stone-500'
                          }`}
                        >
                          pts
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>

          <button
            onClick={handleLeaveLobby}
            className="group relative flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-stone-800 hover:bg-stone-700 text-white rounded-xl font-bold text-lg transition-all duration-300 border border-stone-600 hover:border-stone-500 shadow-lg hover:shadow-xl active:scale-95"
          >
            <div className="absolute inset-0 bg-linear-to-r from-red-500/0 via-red-500/10 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            <LogOut className="w-5 h-5 mr-3 text-red-400 group-hover:text-red-300 transition-colors" />
            <span className="tracking-wide">Leave Lobby</span>
          </button>
        </div>
      </div>
    </div>
  )
}
