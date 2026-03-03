//hooks
import { useState } from 'react'
import { useLobby } from '@/hooks/useLobby.ts'
import { usePlayer } from '@/hooks/usePlayer'

//types
import type { Card } from '@/types/models/Card'

//components
import { Background } from '@/app/components/common/Background.tsx'
import Info from '@/app/components/game/Info.tsx'
import BiddingPanel from '@/app/components/game/BiddingPanel.tsx'
import { DeckPile } from '@/app/components/game/DeckPile.tsx'
import Hands from '@/app/components/game/Hands.tsx'
import { GameStatus } from '@/app/components/game/GameStatus'
import PlayedCards from '@/app/components/game/PlayedCards'
import { RoundResult } from '@/app/components/game/RoundResult'

export function GameBoard() {
  const { lobbyData, roundCountdown } = useLobby()
  const { playerData } = usePlayer()
  const [showInfo, setShowInfo] = useState(false)

  const isMyTurn =
    playerData.player.name === lobbyData.game.currentPlayer.name &&
    lobbyData.lobby.gamePhase === 'bidding'

  const showDeck =
    lobbyData.lobby.gamePhase === 'splitting' ||
    lobbyData.lobby.gamePhase === 'dealing'

  // Map currentTrick.playedCards to 4 visual slots relative to the current player
  // Slot 0 = bottom (me), 1 = right, 2 = top, 3 = left
  const myIndex = lobbyData.game.sortedPlayers.findIndex(
    (p) => p.name === playerData.player.name,
  )
  const tableCards: (Card | null)[] = [null, null, null, null]
  const playedCards = lobbyData.game.currentTrick?.playedCards ?? []
  for (const { player, card } of playedCards) {
    const absIndex = lobbyData.game.sortedPlayers.findIndex(
      (p) => p.name === player.name,
    )
    if (absIndex !== -1) {
      const relativeSlot = (absIndex - myIndex + 4) % 4
      tableCards[relativeSlot] = card
    }
  }

  return (
    <div className="h-screen relative overflow-hidden">
      {showInfo && (
        <Info
          setShowInfo={setShowInfo}
          scores={lobbyData.game.teams.map((t) => t.score)}
        />
      )}

      {/* Round result overlay — shown for 5s after each round ends */}
      {lobbyData.roundResultTeams && roundCountdown !== null && (
        <RoundResult
          teams={lobbyData.roundResultTeams}
          countdown={roundCountdown}
        />
      )}

      {isMyTurn && <BiddingPanel isMyTurn={isMyTurn} />}

      <GameStatus
        gamePhase={lobbyData.lobby.gamePhase}
        currentPlayerName={lobbyData.game.currentPlayer.name}
        currentAnnounce={lobbyData.game.currentAnnounce}
        passCounter={lobbyData.game.passCounter}
      />

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

        {/* Played cards in the center of the table */}
        {lobbyData.lobby.gamePhase === 'playing' && (
          <PlayedCards tableCards={tableCards} />
        )}

        {/* Player Plates with Cards */}
        <Hands />
      </div>
    </div>
  )
}
