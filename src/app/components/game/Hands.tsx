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

  // Determine the current user's index in the sorted list
  const currentUserIndex = lobbyData.game.sortedPlayers.findIndex(
    (p) => p.name === playerData.player.name,
  )

  // If found, rotate logic. If not found (spectator?), default to 0.
  const baseIndex = currentUserIndex !== -1 ? currentUserIndex : 0

  // Calculate indices for display positions: Bottom (0), Right (1), Top (2), Left (3)
  // relative to the current user.
  const bottomIndex = baseIndex
  const rightIndex = (baseIndex + 1) % 4
  const topIndex = (baseIndex + 2) % 4
  const leftIndex = (baseIndex + 3) % 4

  const positions = [
    { index: bottomIndex, position: 'bottom' as const },
    { index: rightIndex, position: 'right' as const },
    { index: topIndex, position: 'top' as const },
    { index: leftIndex, position: 'left' as const },
  ]

  const handleCardPlay = (card: Card, playerIndex: number) => {
    // Only allow current player to play
    const player = lobbyData.game.sortedPlayers[playerIndex]
    if (!player || player.name !== playerData.player.name) {
      console.error('Not current player')
      return
    }

    // Update local lobby state (remove card from hand)
    const newHand = player.hand.filter((c) => c.id !== card.id)

    const updatedPlayers = lobbyData.game.sortedPlayers.map((p, i) =>
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
      {positions.map(({ index, position }) => {
        const player = lobbyData.game.sortedPlayers[index]
        console.log(lobbyData.game)
        if (!player) {
          console.error('No player found at index', index)
          return null
        }

        return (
          <PlayerPlate
            key={player.name}
            playerIndex={index}
            playerName={player.name}
            cards={player.hand}
            position={position}
            onCardClick={(card) => handleCardPlay(card, index)}
            isCurrentPlayer={player.name === playerData.player.name}
          />
        )
      })}
    </div>
  )
}

export default Hands
