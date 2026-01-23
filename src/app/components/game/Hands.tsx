import { motion } from 'motion/react'
import { Card as GameCard } from './Card'
import type { Card } from '@/types/models/Card'
import PlayerProfile from '@/app/components/game/PlayerProfile.tsx'

//hooks
import { useLobby } from '@/hooks/useLobby.ts'
import { useSignalR } from '@/hooks/useSignalR'
import { usePlayer } from '@/hooks/usePlayer'

type HandsProps = {
  playedCards: Array<Card | null>
  setPlayedCards: React.Dispatch<React.SetStateAction<Array<Card | null>>>
}

const Hands = ({ playedCards = [null, null, null, null], setPlayedCards }: HandsProps
) => {
  const { lobbyData, dispatchLobby } = useLobby()
  const { playerData } = usePlayer()
  const { invoke } = useSignalR()
  const playerNames = lobbyData.game.sortedPlayers.map((p) => p.name)

  const player1Cards = lobbyData.game.currentPlayer?.hand as Card[] | [null, null, null, null, null, null, null, null]
  const player2Cards = lobbyData.game.sortedPlayers[1].hand as Card[] | [null, null, null, null, null, null, null, null]
  const player3Cards = lobbyData.game.sortedPlayers[2].hand as Card[] | [null, null, null, null, null, null, null, null]
  const player4Cards = lobbyData.game.sortedPlayers[3].hand as Card[] | [null, null, null, null, null, null, null, null]

  const handleCardPlay = (card: Card, playerIndex: number) => {
    if (lobbyData.game.currentPlayer === null) return

    const newPlayedCards = [...playedCards]
    newPlayedCards[playerIndex] = card
    setPlayedCards(newPlayedCards)

    const currentHand = lobbyData.game.currentPlayer.hand
    const newHand = currentHand.filter((c) => c.id !== card.id)
    dispatchLobby({
      type: 'UPDATE_GAME',
      game: {
        ...lobbyData.game,
        currentPlayer: {
          ...lobbyData.game.currentPlayer,
          hand: newHand,
        },
      },
    })

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
  }

  const handleDealing = async () => {

    await invoke("DealingCards", {
      lobbyId: playerData.player.lobbyId,
      playerId: playerData.player.name
    });
  }


  return (
    <>
      {/* Player 1 - Bottom */}
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-full flex flex-row-reverse items-center justify-center gap-2">
        {/* Player 1 Cards */}
        <div className="flex justify-center -space-x-12">
          {player1Cards.map((card) => (
            <div key={card?.id}>
              <GameCard
                isOpponent={false}
                card={card}
                onClick={() => handleCardPlay(card, 0)}
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
              // whileHover={currentPlayer === 1 ? { x: 15 } : {}}
            >
              <GameCard
                isOpponent={false}
                card={card}
                onClick={() => handleCardPlay(card, 1)}
                size="normal"
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
              // whileHover={
              //   currentPlayer === 2 && !roundActive ? { x: 15 } : {}
              // }
            >
              <GameCard
                isOpponent={false}
                card={card}
                onClick={() => handleCardPlay(card, 2)}
                size="normal"
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
              // whileHover={
              //   currentPlayer === 3 && !roundActive ? { x: 15 } : {}
              // }
            >
              <GameCard
                isOpponent={false}
                card={card}
                onClick={() => handleCardPlay(card, 3)}
                size="normal"
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
    </>
  )
}

export default Hands
