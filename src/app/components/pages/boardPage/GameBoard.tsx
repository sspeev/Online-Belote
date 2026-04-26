// hooks
import { useLobby } from '@/hooks/useLobby.ts'
import { usePlayer } from '@/hooks/usePlayer'

// types
import type { Card } from '@/types/models/Card'
import { useIsMobile } from '@/hooks/useIsMobile'

// components
import BiddingPanel from '@/app/components/pages/boardPage/components/BiddingPanel'
import { DeckPile } from '@/app/components/pages/boardPage/components/DeckPile'
import Hands from '@/app/components/pages/boardPage/components/Hands'
import { GameStatus } from '@/app/components/pages/boardPage/components/GameStatus'
import PlayedCards from '@/app/components/pages/boardPage/components/PlayedCards'
import { RoundResult } from '@/app/components/pages/boardPage/components/RoundResult'
import { GameOverScreen } from '@/app/components/pages/boardPage/components/GameOverScreen'

export function GameBoard() {
  const { lobbyData, roundCountdown } = useLobby()
  const { playerData } = usePlayer()
  const isMobile = useIsMobile()

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

  if (lobbyData.lobby.gamePhase === 'gameover') {
    return <GameOverScreen teams={lobbyData.game.teams} />
  }

  return (
    <div className="h-screen flex flex-col relative overflow-hidden bg-background-light dark:bg-background-dark wood-texture">

      {lobbyData.roundResultTeams && roundCountdown !== null && (
        <RoundResult
          teams={lobbyData.roundResultTeams}
          countdown={roundCountdown}
        />
      )}

      {isMyTurn && <BiddingPanel isMyTurn={isMyTurn} />}

      {/* ── Main Board ───────────────────────────────────────────────── */}
      <main className="flex-1 relative overflow-hidden min-h-0">
        <div
          className={`absolute w-full max-w-7xl aspect-square max-h-full ${
            isMobile
              ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
              : 'top-10 left-32'
          }`}
        >
          {/* Center table surface */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
              isMobile ? 'w-screen h-full' : 'w-[1000px] h-[550px]'
            }`}
          >
            {/* Outer beige border */}
            <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-amber-950 via-stone-200 dark:via-stone-700 to-amber-950 shadow-2xl p-6">
              <div className="w-full h-full rounded-2xl bg-linear-to-br from-[#1a0c06] via-[#2d1409] to-[#120703] shadow-inner relative overflow-hidden">
                {/* Subtle radial highlight */}
                <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-black/40" />
                {/* Inner shadow for depth */}
                <div className="absolute inset-0 rounded-2xl shadow-[inset_0_4px_20px_rgba(0,0,0,0.4)]" />
                {/* Glass overlay */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/5 via-transparent to-black/10" />

                {/* Pulsing center ring – matches the prototype's dashed ring */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full border-2 border-dashed border-white/10 animate-pulse" />
                </div>
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
          {showDeck && (
            <DeckPile size={isMobile ? 'small' : 'normal'} rotation={0} />
          )}

          {/* Played cards in the center of the table */}
          {lobbyData.lobby.gamePhase === 'playing' && (
            <PlayedCards
              tableCards={tableCards}
              size={isMobile ? 'small' : 'normal'}
            />
          )}

          {/* Player Plates with Cards */}
          <Hands />
        </div>
      </main>

      {/* Floating phase/bid status pill – top-right */}
      <GameStatus
        gamePhase={lobbyData.lobby.gamePhase}
        currentPlayerName={lobbyData.game.currentPlayer.name}
        currentAnnounce={lobbyData.game.currentAnnounce}
        passCounter={lobbyData.game.passCounter}
      />
    </div>
  )
}
