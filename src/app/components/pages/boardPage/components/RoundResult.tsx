import type { Team } from '@/types/models/Team'

type RoundResultProps = {
  teams: Team[]
  /** Seconds remaining before auto-transition */
  countdown: number
}

export function RoundResult({ teams, countdown }: RoundResultProps) {
  const winner =
    teams[0].score !== teams[1].score
      ? teams.reduce((a, b) => (a.score > b.score ? a : b))
      : null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />

      {/* Card */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm px-4">
        <div className="bg-white/20 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600/80 to-green-700/80 px-6 py-4 text-center">
            <h2 className="text-2xl font-bold text-white tracking-wide">
              Round Over
            </h2>
            <p className="text-emerald-100/80 text-sm mt-0.5">
              Next round in{' '}
              <span className="font-semibold text-white">{countdown}s</span>
            </p>
          </div>

          {/* Teams */}
          <div className="p-5 space-y-3">
            {teams.map((team) => {
              const isWinner = winner?.id === team.id
              const teamLabel = team.players.map((p) => p.name).join(' & ')

              return (
                <div
                  key={team.id}
                  className={`rounded-2xl px-5 py-4 flex items-center justify-between transition-all
                    ${
                      isWinner
                        ? 'bg-emerald-500/30 border border-emerald-400/50 shadow-lg shadow-emerald-900/20'
                        : 'bg-white/10 border border-white/20'
                    }`}
                >
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {teamLabel}
                    </p>
                    {isWinner && (
                      <span className="text-emerald-300 text-xs font-medium mt-0.5 inline-block">
                        🏆 Round winner
                      </span>
                    )}
                  </div>
                  <span className="text-3xl font-bold text-white tabular-nums">
                    {team.score}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-white/10 mx-5 mb-5 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-400 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${(countdown / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
