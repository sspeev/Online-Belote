import { useNavigate } from '@tanstack/react-router'
import { useLobby } from '@/hooks/useLobby'
import { usePlayer } from '@/hooks/usePlayer'
import { Trophy, Users, Home, RotateCcw, Medal } from 'lucide-react'

const Results = () => {
  const navigate = useNavigate()
  const { lobbyData } = useLobby()
  const { playerData } = usePlayer()

  // Fallback / Sample data for demonstration if actual data is missing
  const teams = lobbyData.game.teams.length === 2 
    ? lobbyData.game.teams 
    : [
        { id: 1, players: [{ name: playerData.player.name || 'You', lobbyId: 1, status: 'Connected', hoster: true, hand: [] }, { name: 'Teammate', lobbyId: 1, status: 'Connected', hoster: false, hand: [] }], score: 151 },
        { id: 2, players: [{ name: 'Opponent 1', lobbyId: 1, status: 'Connected', hoster: false, hand: [] }, { name: 'Opponent 2', lobbyId: 1, status: 'Connected', hoster: false, hand: [] }], score: 104 }
      ]

  const winningTeam = teams[0].score > teams[1].score ? teams[0] : teams[1]
  const isPlayerInWinningTeam = winningTeam.players.some(
    (p) => p.name === playerData.player.name
  )

  const handlePlayAgain = () => {
    // Navigate back to lobby or waiting room
    if (lobbyData.lobby.id) {
      navigate({
        to: '/lobby/$lobbyId/waiting',
        params: { lobbyId: lobbyData.lobby.id.toString() },
      })
    } else {
      navigate({ to: '/join' })
    }
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-28 w-full bg-brand-offwhite dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-200">
      <div className="w-full max-w-4xl space-y-12 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex p-4 bg-brand-burnt/10 dark:bg-brand-burnt/20 text-brand-burnt rounded-full animate-bounce">
            <Trophy className="size-12" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
            Match Complete
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-md mx-auto">
            {isPlayerInWinningTeam 
              ? 'Congratulations! Your team emerged victorious.' 
              : 'Good game! Better luck next time.'}
          </p>
        </div>

        {/* Victory Banner */}
        <div className={`p-6 rounded-2xl text-center border shadow-sm ${
          isPlayerInWinningTeam 
            ? 'bg-brand-gold/10 border-brand-gold/30 text-brand-gold' 
            : 'bg-brand-burnt/10 border-brand-burnt/30 text-brand-burnt'
        }`}>
          <span className="text-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3">
            <Medal className="size-8" />
            {isPlayerInWinningTeam ? 'Victory!' : 'Defeat'}
          </span>
        </div>

        {/* Scoreboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teams.map((team) => {
            const isWinner = team.id === winningTeam.id
            const isOurTeam = team.players.some(p => p.name === playerData.player.name)

            return (
              <div 
                key={team.id}
                className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                  isWinner 
                    ? 'bg-white dark:bg-slate-900 border-brand-gold shadow-lg dark:shadow-brand-gold/5 scale-105 md:scale-105 z-10' 
                    : 'bg-white/50 dark:bg-slate-900/50 border-slate-100 dark:border-white/5 shadow-sm opacity-90'
                }`}
              >
                <div className="space-y-6">
                  {/* Team Title */}
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-bold uppercase tracking-wider ${
                      isOurTeam ? 'text-brand-burnt' : 'text-slate-400'
                    }`}>
                      {isOurTeam ? 'Our Team (We)' : `Opponents (They)`}
                    </span>
                    {isWinner && (
                      <span className="px-3 py-1 bg-brand-gold/20 text-brand-gold text-xs font-bold rounded-full uppercase tracking-widest">
                        Winners
                      </span>
                    )}
                  </div>

                  {/* Big Score */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white">
                      {team.score}
                    </span>
                    <span className="text-slate-400 font-medium text-lg">/ 151</span>
                  </div>

                  {/* Players List */}
                  <div className="pt-6 border-t border-slate-100 dark:border-white/5 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-wider">
                      <Users className="size-4" />
                      <span>Players</span>
                    </div>
                    <ul className="grid grid-cols-1 gap-2">
                      {team.players.map((player, pIndex) => (
                        <li 
                          key={pIndex}
                          className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-white/5 rounded-xl text-slate-700 dark:text-slate-300 font-semibold"
                        >
                          <div className="size-2 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                          {player.name}
                          {player.name === playerData.player.name && (
                            <span className="text-xs text-brand-burnt font-bold uppercase tracking-widest ml-auto">
                              You
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8 justify-center">
          <button
            onClick={handlePlayAgain}
            className="px-8 py-4 bg-brand-charcoal dark:bg-white text-white dark:text-slate-900 rounded-full font-bold hover:bg-brand-burnt dark:hover:bg-brand-burnt dark:hover:text-white transition-all shadow-lg hover:shadow-brand-burnt/20 flex items-center justify-center gap-3 group cursor-pointer"
          >
            <RotateCcw className="size-5 group-hover:rotate-180 transition-transform duration-500" />
            <span>Play Again</span>
          </button>
          <button
            onClick={() => navigate({ to: '/' })}
            className="px-8 py-4 bg-transparent border-2 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 rounded-full font-semibold hover:bg-slate-50 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="size-5" />
            <span>Back to Menu</span>
          </button>
        </div>

      </div>
    </main>
  )
}

export default Results