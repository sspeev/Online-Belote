//hooks
import { useState } from 'react'
import { useLobby } from '@/hooks/useLobby.ts'

//components
import { Background } from '@/app/components/common/Backgound.tsx'
import Info from '@/app/components/game/Info.tsx'
import BiddingPanel from '@/app/components/game/BiddingPanel.tsx'
import { DeckPile } from '@/app/components/game/DeckPile.tsx'
import PlayedCards from '@/app/components/game/PlayedCards.tsx'
import Hands from '@/app/components/game/Hands.tsx'
import PlayerProfile from '@/app/components/game/PlayerProfile.tsx'

//types
import { type Card } from '@/types/models/Card.ts'

//libraries
//import LiquidGlass from '@nkzw/liquid-glass'

export function GameBoard() {
  const { lobbyData } = useLobby()
  const [showInfo, setShowInfo] = useState(false)
  const showBiddingPanel = lobbyData.lobby.gamePhase === 'bidding'
  const showDeck = lobbyData.lobby.gamePhase === 'splitting'
  const dealing = lobbyData.lobby.gamePhase === 'dealing'

  const playerNames = lobbyData.game.sortedPlayers.map((p) => p.name)
  const [playedCards, setPlayedCards] = useState<Array<Card | null>>([
    null,
    null,
    null,
    null,
  ])

  return (
    <div className="h-screen relative overflow-hidden">
      {/* <LiquidGlass
          aberrationIntensity={2}
          blurAmount={0.1}
          borderRadius={100}
          displacementScale={64}
          elasticity={0.35}
          saturation={130}
          onClick={() => setShowInfo(!showInfo)}
          className="top-10 right-12 z-30 w-10 h-10"
        >
          <span>i</span>
        </LiquidGlass> */}

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
        {showDeck && <DeckPile size={'normal'} rotation={0} />}
        <PlayedCards tableCards={playedCards} />
        
          <Hands playedCards={playedCards} setPlayedCards={setPlayedCards} />
        
        
        {/* Player 1 Profile */}
        {/* <div className="mt-4">
          <PlayerProfile
            index={0}
            name={playerNames[0]}
            // isActive={currentPlayer === 0}
            position="bottom"
          />
        </div> */}
        {/* Player 2 Profile */}
        {/* <div className="absolute right-16 mr-4">
          <PlayerProfile
            index={1}
            name={playerNames[1]}
            //isActive={currentPlayer === 1}
            position="right"
          />
        </div> */}
        {/* Player 3 Profile */}
        {/* <div className="mb-4">
          <PlayerProfile
            index={2}
            name={playerNames[2]}
            //isActive={currentPlayer === 2}
            position="top"
          />
        </div> */}
        {/* Player 4 Profile */}
        {/* <div className="absolute left-16 ml-4">
          <PlayerProfile
            index={3}
            name={playerNames[3]}
            //isActive={currentPlayer === 3}
            position="left"
          />
        </div> */}
      </div>
    </div>
  )
}
