import { useLobby } from '@/hooks/useLobby.ts'

type InfoProps = {
  scores: number[]
  setShowInfo: React.Dispatch<React.SetStateAction<boolean>>
}

const Info = (props: InfoProps) => {
  const { lobbyData } = useLobby();

  return (
    <>
      <div
        onClick={() => props.setShowInfo(false)}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
      />

      {/* Modal Content */}
      <div
        // initial={{ opacity: 0, scale: 0.9, y: 20 }}
        // animate={{ opacity: 1, scale: 1, y: 0 }}
        // exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/60 p-6">
          {/* Close button */}
          <button
            onClick={() => props.setShowInfo(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-200/60 hover:bg-neutral-300/60 flex items-center justify-center transition-colors"
          >
            {/*<X className="w-5 h-5 text-neutral-700" />*/}
          </button>

          {/* Title */}
          <h2 className="text-3xl mb-6 text-neutral-800 text-center">Belote</h2>

          {/* Scores Grid */}
          <div className="mb-6">
            <h3 className="text-sm uppercase tracking-wide text-neutral-600 mb-3">
              Players & Scores
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {props.scores.map((score, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between gap-2 px-4 py-3 rounded-lg backdrop-blur-md shadow-md transition-all duration-300`}>
                  <div className="flex items-center gap-1">
                    {/*<Trophy className={`w-5 h-5 ${currentPlayer === i ? 'text-emerald-700' : 'text-neutral-600'}`} />*/}
                    <span>{score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Status */}
          <div className="py-4 px-5 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200/60 shadow-md">
            <div className="flex items-center justify-center gap-2">
              {/*<Sparkles className="w-5 h-5 text-emerald-600" />*/}
              <p className="text-neutral-800">{lobbyData.lobby.gamePhase}</p>
              {/*<Sparkles className="w-5 h-5 text-emerald-600" />*/}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Info
