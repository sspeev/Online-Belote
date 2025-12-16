import { useState } from 'react'
import { Card } from './Card.tsx'
import { Background } from '@/app/components/common/Backgound.tsx'
import LiquidGlass from '@nkzw/liquid-glass'
import Info from '@/app/components/game/Info.tsx'
//import User from '../../../assets/svgs/User.svg'
import UserLight from '../../../assets/svgs/UserLight.svg'

const createPlayerCards = (startId: number) => [
  {
    id: startId,
    suit: 'diamond',
    value: 'A',
    color: 'from-neutral-500/80 to-stone-500/80',
    power: 14,
  },
  {
    id: startId + 1,
    suit: 'heart',
    value: 'K',
    color: 'from-neutral-500/80 to-stone-500/80',
    power: 13,
  },
  {
    id: startId + 2,
    suit: 'club',
    value: 'Q',
    color: 'from-neutral-500/80 to-stone-500/80',
    power: 12,
  },
  {
    id: startId + 3,
    suit: 'spade',
    value: 'J',
    color: 'from-neutral-500/80 to-stone-500/80',
    power: 11,
  },
  {
    id: startId + 4,
    suit: 'diamond',
    value: '10',
    color: 'from-neutral-500/80 to-stone-500/80',
    power: 10,
  },
  {
    id: startId + 5,
    suit: 'heart',
    value: '9',
    color: 'from-neutral-500/80 to-stone-500/80',
    power: 9,
  },
  {
    id: startId + 6,
    suit: 'club',
    value: '8',
    color: 'from-neutral-500/80 to-stone-500/80',
    power: 8,
  },
  {
    id: startId + 7,
    suit: 'spade',
    value: '7',
    color: 'from-neutral-500/80 to-stone-500/80',
    power: 7,
  },
]

const playerNames = ['Emma', 'Lucas', 'Sophie', 'Oliver']
const playerAvatarColors = [
  'from-rose-400 to-pink-500',
  'from-blue-400 to-indigo-500',
  'from-purple-400 to-violet-500',
  'from-amber-400 to-orange-500',
]

interface PlayerProfileProps {
  playerIndex: number
  score: number
  isActive: boolean
  position: 'bottom' | 'right' | 'top' | 'left'
}

function PlayerProfile({
  playerIndex,
  score,
  isActive,
  position,
}: PlayerProfileProps) {
  const positionStyles = {
    bottom: 'flex-row',
    right: 'flex-col',
    top: 'flex-row',
    left: 'flex-col',
  }

  return (
    <div
      // initial={{ opacity: 0, scale: 0.8 }}
      // animate={{ opacity: 1, scale: 1 }}
      className={`
        flex ${positionStyles[position]} items-center gap-3 px-4 py-3 rounded-2xl
        ${isActive ? 'bg-emerald-600/30 border-2 border-emerald-400/60 shadow-lg shadow-emerald-500/20' : 'bg-white/50 border-2 border-white/60'}
        backdrop-blur-xl transition-all duration-300
      `}
    >
      {/* Avatar */}
      <div
        className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${playerAvatarColors[playerIndex]} shadow-lg flex items-center justify-center`}
      >
        <img src={UserLight} width={25} height={25} alt={"Avatar"}/>
        {isActive && (
          <div
            className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"
          >
            {/*<Circle className="w-full h-full text-emerald-400 fill-emerald-400" />*/}
          </div>
        )}
      </div>

      {/* Player Info */}
      <div
        className={`flex ${position === 'right' || position === 'left' ? 'flex-col items-center' : 'flex-col'}`}
      >
        <span
          className={`${isActive ? 'text-emerald-900' : 'text-neutral-700'} whitespace-nowrap`}
        >
          {playerNames[playerIndex]}
        </span>
        <div className="flex items-center gap-1">
          {/*<Trophy className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-neutral-600'}`} />*/}
          <span
            className={`text-sm ${isActive ? 'text-emerald-800' : 'text-neutral-600'}`}
          >
            {score}
          </span>
        </div>
      </div>
    </div>
  )
}

export function GameBoard() {
  const [player1Cards, setPlayer1Cards] = useState(createPlayerCards(1))
  const [player2Cards, setPlayer2Cards] = useState(createPlayerCards(9))
  const [player3Cards, setPlayer3Cards] = useState(createPlayerCards(17))
  const [player4Cards, setPlayer4Cards] = useState(createPlayerCards(25))

  const [playedCards, setPlayedCards] = useState<
    ((typeof player1Cards)[0] | null)[]
  >([null, null, null, null])
  const [scores, setScores] = useState([0, 0, 0, 0])
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [message, setMessage] = useState('Player 1 - Select your card')
  const [roundActive, setRoundActive] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  const playerHands = [player1Cards, player2Cards, player3Cards, player4Cards]
  const setPlayerHands = [
    setPlayer1Cards,
    setPlayer2Cards,
    setPlayer3Cards,
    setPlayer4Cards,
  ]

  const handleCardPlay = (
    card: (typeof player1Cards)[0],
    playerIndex: number,
  ) => {
    if (roundActive || playerIndex !== currentPlayer) return

    const newPlayedCards = [...playedCards]
    newPlayedCards[playerIndex] = card
    setPlayedCards(newPlayedCards)

    const currentHand = playerHands[playerIndex]
    setPlayerHands[playerIndex](currentHand.filter((c) => c.id !== card.id))

    if (playerIndex < 3) {
      setCurrentPlayer(playerIndex + 1)
      setMessage(`Player ${playerIndex + 2} - Select your card`)
    } else {
      setRoundActive(true)
      setMessage('Revealing cards...')

      setTimeout(() => {
        const powers = newPlayedCards.map((c) => c?.power || 0)
        const maxPower = Math.max(...powers)
        const winners = powers
          .map((p, i) => (p === maxPower ? i : -1))
          .filter((i) => i !== -1)

        if (winners.length === 1) {
          const newScores = [...scores]
          newScores[winners[0]]++
          setScores(newScores)
          setMessage(`Player ${winners[0] + 1} wins this round!`)
        } else {
          setMessage(
            `Tie between players ${winners.map((w) => w + 1).join(' and ')}!`,
          )
        }

        setTimeout(() => {
          setPlayedCards([null, null, null, null])
          setRoundActive(false)
          setCurrentPlayer(0)

          if (player1Cards.length > 1) {
            setMessage('Player 1 - Select your card')
          } else {
            const maxScore = Math.max(...scores)
            const gameWinners = scores
              .map((s, i) => (s === maxScore ? i : -1))
              .filter((i) => i !== -1)
            if (gameWinners.length === 1) {
              setMessage(`Player ${gameWinners[0] + 1} wins the game!`)
            } else {
              setMessage(
                `Game Over - Tie between players ${gameWinners.map((w) => w + 1).join(' and ')}!`,
              )
            }
          }
        }, 3000)
      }, 1000)
    }
  }

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

      <Background blur={true} buttons={false} />

      {showInfo && (
        <Info
          setShowInfo={setShowInfo}
          scores={scores}
          currentPlayer={currentPlayer}
          message={message}
        />
      )}

      <div className="absolute top-10 left-30 w-full max-w-7xl aspect-square max-h-[90vh]">
        {/* Center table surface */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[550px]">
          {/* Outer beige border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-100 via-stone-200 to-amber-100 shadow-2xl p-6">
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-emerald-800 via-green-700 to-emerald-900 shadow-inner relative overflow-hidden">
              {/* Subtle radial highlight */}
              <div className="absolute inset-0 bg-gradient-radial from-green-600/30 via-transparent to-emerald-900/50" />
              {/* Inner shadow for depth */}
              <div className="absolute inset-0 rounded-2xl shadow-[inset_0_4px_20px_rgba(0,0,0,0.4)]" />

              {/* Glass overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-black/10" />
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

        {/* Played cards on table - positioned around the center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] z-10">
          {/* Player 1 card - bottom of table */}
          <div className="absolute z-10 bottom-8 left-1/2 -translate-x-1/2">
            {playedCards[0] && (
              <div
                style={{
                  animation: 'springIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
                }}
              >
                <Card card={playedCards[0]} size="normal" rotation={0} />
              </div>
            )}
          </div>

          {/* Player 2 card - right of table */}
          <div className="absolute z-10 right-8 top-1/2 -translate-y-1/2">
            {playedCards[1] && (
              <div>
                <Card card={playedCards[1]} size="normal" rotation={0} />
              </div>
            )}
          </div>

          {/* Player 3 card - top of table */}
          <div className="absolute z-10 top-8 left-1/2 -translate-x-1/2">
            {playedCards[2] && (
              <div>
                <Card card={playedCards[2]} size="normal" rotation={0} />
              </div>
            )}
          </div>

          {/* Player 4 card - left of table */}
          <div className="absolute z-10 left-8 top-1/2 -translate-y-1/2">
            {playedCards[3] && (
              <div>
                <Card card={playedCards[3]} size="normal" rotation={0} />
              </div>
            )}
          </div>
        </div>

        {/* Player 1 - Bottom */}
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-full flex flex-row-reverse items-center justify-center gap-2">
          <div className="flex justify-center -space-x-12">
            {player1Cards.map((card) => (
              <div
                key={card.id}
              >
                <Card
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
              playerIndex={0}
              score={scores[0]}
              isActive={currentPlayer === 0}
              position="bottom"
            />
          </div>
        </div>

        {/* Player 2 - Right */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 h-full flex flex-row-reverse items-center">
          <div className="flex flex-col items-center -space-y-28">
            {player2Cards.map((card) => (
              <div
                key={card.id}
                // initial={{ x: 100, opacity: 0 }}
                // animate={{ x: 0, opacity: 1 }}
                // transition={{ delay: index * 0.05 }}
                // whileHover={currentPlayer === 1 && !roundActive ? { x: 15 } : {}}
              >
                <Card
                  card={card}
                  onClick={() => handleCardPlay(card, 1)}
                  isClickable={currentPlayer === 1 && !roundActive}
                  size="normal"
                  isOpponent={true}
                  rotation={-90}
                />
              </div>
            ))}
          </div>
          {/* Player 2 Profile */}
          <div className="absolute right-16 mr-4">
            <PlayerProfile
              playerIndex={1}
              score={scores[1]}
              isActive={currentPlayer === 1}
              position="right"
            />
          </div>
        </div>

        {/* Player 3 - Top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full flex flex-row items-center justify-center gap-2">
          <div className="flex justify-center -space-x-20">
            {player3Cards.map((card) => (
              <div key={card.id}>
                <Card
                  card={card}
                  onClick={() => handleCardPlay(card, 2)}
                  isClickable={currentPlayer === 2 && !roundActive}
                  size="normal"
                  isOpponent={true}
                  rotation={0}
                />
              </div>
            ))}
          </div>
          {/* Player 3 Profile */}
          <div className="mb-4">
            <PlayerProfile
              playerIndex={2}
              score={scores[2]}
              isActive={currentPlayer === 2}
              position="top"
            />
          </div>
        </div>

        {/* Player 4 - Left */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2 h-full flex flex-row items-center">
          <div className="flex flex-col items-center -space-y-28">
            {player4Cards.map((card) => (
              <div key={card.id}>
                <Card
                  card={card}
                  onClick={() => handleCardPlay(card, 3)}
                  isClickable={currentPlayer === 3 && !roundActive}
                  size="normal"
                  isOpponent={true}
                  rotation={90}
                />
              </div>
            ))}
          </div>
          {/* Player 4 Profile */}
          <div className="absolute left-16 ml-4">
            <PlayerProfile
              playerIndex={3}
              score={scores[3]}
              isActive={currentPlayer === 3}
              position="left"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
