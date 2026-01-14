import { useState } from 'react'
import { Card as GameCard } from './Card.tsx'
import { type Card } from '@/types/models/Card.ts'
import { Background } from '@/app/components/common/Backgound.tsx'
import LiquidGlass from '@nkzw/liquid-glass'
import Info from '@/app/components/game/Info.tsx'
import PlayerProfile from '@/app/components/game/PlayerProfile.tsx'
import { DeckPile } from '@/app/components/game/DeckPile.tsx'
import { motion } from 'motion/react'
import { useLobby } from '@/hooks/useLobby.ts'
import BiddingPanel from '@/app/components/game/BiddingPanel.tsx'

export function GameBoard() {
  const { lobbyData, dispatchLobby } = useLobby()
  const [showInfo, setShowInfo] = useState(false)
  const [showBiddingPanel, setShowBiddingPanel] = useState(lobbyData.lobby.gamePhase === 'bidding')
  const [showDeck, setSplitting] = useState(lobbyData.lobby.gamePhase === 'splitting')
  const [dealing, setDealing] = useState(lobbyData.lobby.gamePhase === 'dealing')

  const playerNames = lobbyData.lobby.game.sortedPlayers.map((p) => p.name)

  const player1Cards = lobbyData.lobby.game.currentPlayer?.hand as Card[]
  const [playedCards, setPlayedCards] = useState<(Card | null)[]>([null, null, null, null])

  const handleCardPlay = (
    card: Card,
    playerIndex: number,
  ) => {
    if (lobbyData.lobby.game.currentPlayer === null) return
    
    const newPlayedCards = [...playedCards]
    newPlayedCards[playerIndex] = card
    setPlayedCards(newPlayedCards)
  
    const currentHand = lobbyData.lobby.game.currentPlayer.hand
    const newHand = currentHand.filter((c) => c.id !== card.id)
  


    // if (playerIndex < 3) {
    //   setMessage(`Player ${playerIndex + 2} - Select your card`)
    // } 
    // else 
    //   {
    //   setRoundActive(true)
    //   setMessage('Revealing cards...')
  
    //   setTimeout(() => {
    //     const powers = newPlayedCards.map((c) => c?.power || 0)  //       const powers = newPlayedCards.map((c) => c?.power || 0)
    //     const maxPower = Math.max(...powers)
    //     const winners = powers
    //       .map((p, i) => (p === maxPower ? i : -1))
    //       .filter((i) => i !== -1)
    //     const scores = gameData.game.teams.map((t) => t.score)
  
    //     if (winners.length === 1) {
    //       const newScores = [...scores]
    //       newScores[winners[0]]++
    //       //setScores(newScores)
    //       setMessage(`Player ${winners[0] + 1} wins this round!`)
    //     } else {
    //       setMessage(
    //         `Tie between players ${winners.map((w) => w + 1).join(' and ')}!`,
    //       )
    //     }
  
    //     // setTimeout(() => {
    //     //   setPlayedCards([null, null, null, null])
    //     //   setRoundActive(false)
    //     //   setCurrentPlayer(0)
  
    //     //   if (player1Cards.length > 1) {
    //     //     setMessage('Player 1 - Select your card')
    //     //   } else {
    //     //     const maxScore = Math.max(...scores)
    //     //     const gameWinners = scores
    //     //       .map((s, i) => (s === maxScore ? i : -1))
    //     //       .filter((i) => i !== -1)
    //     //     if (gameWinners.length === 1) {
    //     //       setMessage(`Player ${gameWinners[0] + 1} wins the game!`)
    //     //     } else {
    //     //       setMessage(
    //     //         `Game Over - Tie between players ${gameWinners.map((w) => w + 1).join(' and ')}!`,
    //     //       )
    //     //     }
    //     //   }
    //     // }, 1500)
    //   }, 1000)
    // }


  return (
    <div className="h-screen relative overflow-hidden">
      <LiquidGlass
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
      </LiquidGlass>

      {showInfo && (
        <Info
          setShowInfo={setShowInfo}
          scores={lobbyData.lobby.game.teams.map((t) => t.score)}
        />
      )}

      {showBiddingPanel && (
        <BiddingPanel setShowBidding={setShowBiddingPanel} />
      )}

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
        {showDeck && (
          <DeckPile size={'normal'} rotation={0} setSplitting={setSplitting} />
        )}

        {dealing && <PlayedCards />}


      {/* Player 1 - Bottom */}
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-full flex flex-row-reverse items-center justify-center gap-2">
        {/* Player 1 Cards */}
        <div className="flex justify-center -space-x-12">
          {player1Cards.map((card) => (
            <div key={card.id}>
              <GameCard
                card={card}
                onClick={() => handleCardPlay(card, 0)}
                isClickable={currentPlayer === 0 && !roundActive}
                size="normal"
                rotation={0}
              />
            </div>
          ))}
        </div>
        {/* Player 1 Profile */}
        <div className="mt-4">
          <PlayerProfile
            index={0}
            name={playerNames[0]}
            // isActive={currentPlayer === 0}
            position="bottom"
          />
        </div>
      </div>

      {/* Player 2 - Right */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 h-full flex flex-row-reverse items-center">
        {/* Player 2 Cards */}
        <div className="flex flex-col items-center -space-y-38">
          {player2Cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={currentPlayer === 1 ? { x: 15 } : {}}
            >
              <GameCard
                card={card}
                onClick={() => handleCardPlay(card, 1)}
                isClickable={currentPlayer === 1}
                size="normal"
                isOpponent={true}
                rotation={-90}
              />
            </motion.div>
          ))}
        </div>
        {/* Player 2 Profile */}
        <div className="absolute right-16 mr-4">
          <PlayerProfile
            index={1}
            name={playerNames[1]}
            //isActive={currentPlayer === 1}
            position="right"
          />
        </div>
      </div>

      {/* Player 3 - Top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full flex flex-row items-center justify-center gap-2">
        {/* Player 3 Cards */}
        <div className="flex justify-center -space-x-20">
          {player3Cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={currentPlayer === 2 && !roundActive ? { x: 15 } : {}}
            >
              <GameCard
                card={card}
                onClick={() => handleCardPlay(card, 2)}
                isClickable={currentPlayer === 2 && !roundActive}
                size="normal"
                isOpponent={true}
                rotation={0}
              />
            </motion.div>
          ))}
        </div>
        {/* Player 3 Profile */}
        <div className="mb-4">
          <PlayerProfile
            index={2}
            name={playerNames[2]}
            //isActive={currentPlayer === 2}
            position="top"
          />
        </div>
      </div>

      {/* Player 4 - Left */}
      <div className="absolute left-12 top-1/2 -translate-y-1/2 h-full flex flex-row items-center">
        {/* Player 4 Cards*/}
        <div className="flex flex-col items-center -space-y-28">
          {player4Cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={currentPlayer === 1 && !roundActive ? { x: 15 } : {}}
            >
              <GameCard
                card={card}
                onClick={() => handleCardPlay(card, 3)}
                isClickable={currentPlayer === 3 && !roundActive}
                size="normal"
                isOpponent={true}
                rotation={90}
              />
            </motion.div>
          ))}
        </div>
        {/* Player 4 Profile */}
        <div className="absolute left-16 ml-4">
          <PlayerProfile
            index={3}
            name={playerNames[3]}
            //isActive={currentPlayer === 3}
            position="left"
          />
        </div>
      </div>
    </div>
  )
}
