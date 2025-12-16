
type InfoProps = {
  scores: number[]
  currentPlayer: number
  message: string
  setShowInfo: React.Dispatch<React.SetStateAction<boolean>>
}

const Info = (props: InfoProps) => {
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
                  className={`
                          flex items-center justify-between gap-2 px-4 py-3 rounded-lg
                          ${props.currentPlayer === i ? 'bg-emerald-600/20 border-2 border-emerald-600/40' : 'bg-white/60 border-2 border-neutral-300/40'}
                          backdrop-blur-md shadow-md transition-all duration-300
                        `}
                >
                  <div className="flex items-center gap-2">
                    {/*<User className={`w-5 h-5 ${currentPlayer === i ? 'text-emerald-700' : 'text-neutral-600'}`} />*/}
                    <span
                      className={`${props.currentPlayer === i ? 'text-emerald-800' : 'text-neutral-700'}`}
                    >
                      Player {i + 1}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {/*<Trophy className={`w-5 h-5 ${currentPlayer === i ? 'text-emerald-700' : 'text-neutral-600'}`} />*/}
                    <span
                      className={`${props.currentPlayer === i ? 'text-emerald-800' : 'text-neutral-700'}`}
                    >
                      {score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Status */}
          <div className="py-4 px-5 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200/60 shadow-md">
            <div className="flex items-center justify-center gap-2">
              {/*<Sparkles className="w-5 h-5 text-emerald-600" />*/}
              <p className="text-neutral-800">{props.message}</p>
              {/*<Sparkles className="w-5 h-5 text-emerald-600" />*/}
            </div>
          </div>

          {/* Game Info */}
          <div className="mt-6 pt-6 border-t border-neutral-300/40">
            <h3 className="text-sm uppercase tracking-wide text-neutral-600 mb-2">
              How to Play
            </h3>
            <ul className="text-sm text-neutral-700 space-y-1">
              <li>• Players take turns clockwise</li>
              <li>• Highest card wins the round</li>
              <li>• First to win all rounds wins!</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
export default Info
