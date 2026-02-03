import type { Card } from '@/types/models/Card'
import { PlayerPlate } from './PlayerPlate'
import { useLobby } from '@/hooks/useLobby.ts'
import { usePlayer } from '@/hooks/usePlayer'

// type HandsProps = {
//   playedCards: Card[]
// }

// const Hands = ({ playedCards }: HandsProps) => {
const Hands = () => {
  const { lobbyData, dispatchLobby } = useLobby()
  const { playerData } = usePlayer()

  const sortedPlayers = lobbyData.game.sortedPlayers
  const playersData = sortedPlayers.map((player, index) => ({
    name: player.name,
    cards: player.hand,
    index: index,
    isCurrentPlayer: player.name === playerData.player.name,
  }))

  const handleCardPlay = (card: Card, playerIndex: number) => {
    // Only allow current player to play
    const player = sortedPlayers[playerIndex]
    if (player.name !== playerData.player.name) return

    // Update local lobby state (remove card from hand)
    const newHand = player.hand.filter((c) => c.id !== card.id)

    const updatedPlayers = sortedPlayers.map((p, i) =>
      i === playerIndex ? { ...p, hand: newHand } : p,
    )

    dispatchLobby({
      type: 'UPDATE_GAME',
      game: {
        ...lobbyData.game,
        sortedPlayers: updatedPlayers,
      },
    })

    // TODO: Send card play to backend via SignalR
  }

  return (
    <div>
      {/* Player positions: bottom, right, top, left */}
      {playersData[0] && (
        <PlayerPlate
          playerIndex={0}
          playerName={playersData[0].name}
          cards={playersData[0].cards}
          position="bottom"
          onCardClick={(card) => handleCardPlay(card, 0)}
          isCurrentPlayer={playersData[0].isCurrentPlayer}
        />
      )}

      {playersData[1] && (
        <PlayerPlate
          playerIndex={1}
          playerName={playersData[1].name}
          cards={playersData[1].cards}
          position="right"
          onCardClick={(card) => handleCardPlay(card, 1)}
          isCurrentPlayer={playersData[1].isCurrentPlayer}
        />
      )}

      {playersData[2] && (
        <PlayerPlate
          playerIndex={2}
          playerName={playersData[2].name}
          cards={playersData[2].cards}
          position="top"
          onCardClick={(card) => handleCardPlay(card, 2)}
          isCurrentPlayer={playersData[2].isCurrentPlayer}
        />
      )}

      {playersData[3] && (
        <PlayerPlate
          playerIndex={3}
          playerName={playersData[3].name}
          cards={playersData[3].cards}
          position="left"
          onCardClick={(card) => handleCardPlay(card, 3)}
          isCurrentPlayer={playersData[3].isCurrentPlayer}
        />
      )}
    </div>
  )
}

export default Hands
