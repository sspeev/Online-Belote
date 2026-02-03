//hooks
import { useState } from 'react'
import { useLobby } from '@/hooks/useLobby.ts'

//components
import { Background } from '@/app/components/common/Background.tsx'
import Info from '@/app/components/game/Info.tsx'
import BiddingPanel from '@/app/components/game/BiddingPanel.tsx'
import { DeckPile } from '@/app/components/game/DeckPile.tsx'
import Hands from '@/app/components/game/Hands.tsx'

export function GameBoard() {
  const { lobbyData } = useLobby()
  const [showInfo, setShowInfo] = useState(false)

  const showBiddingPanel = lobbyData.lobby.gamePhase === 'bidding'
  const showDeck =
    lobbyData.lobby.gamePhase === 'splitting' ||
    lobbyData.lobby.gamePhase === 'dealing'

  return (
    <div className="h-screen relative overflow-hidden">
      {showInfo && (
        <Info
          setShowInfo={setShowInfo}
          scores={lobbyData.game.teams.map((t) => t.score)}
        />
      )}

      {showBiddingPanel && <BiddingPanel />}

      <Background blur={true} buttons={false} />

      <div className="absolute top-10 left-30 w-full max-w-7xl aspect-square max-h-[90vh]">
        {/* Center table surface */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[550px]">
          {/* Outer beige border */}
          <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-amber-100 via-stone-200 to-amber-100 shadow-2xl p-6">
            <div className="w-full h-full rounded-2xl bg-linear-to-br from-emerald-800 via-green-700 to-emerald-900 shadow-inner relative overflow-hidden">
              {/* Subtle radial highlight */}
              <div className="absolute inset-0 bg-radial from-green-600/30 via-transparent to-emerald-900/50" />
              {/* Inner shadow for depth */}
              <div className="absolute inset-0 rounded-2xl shadow-[inset_0_4px_20px_rgba(0,0,0,0.4)]" />

              {/* Glass overlay */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/5 via-transparent to-black/10" />
            </div>
          </div>

          {/* Wood grain edge effect */}
          <div
            className="absolute inset-0 rounded-3xl border-8 border-amber-200/60"
            style={{
              boxShadow:
                'inset 0 2px 8px rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.15)',
            }}
          />
        </div>

        {/* Game Elements */}
        {showDeck && <DeckPile size={'normal'} rotation={0} />}

        {/* Player Plates with Cards */}
        <Hands />
      </div>
    </div>
  )
}
