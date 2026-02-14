import type { Card } from '@/types/models/Card'
import { PlayerPlate } from './PlayerPlate'
import { useLobby } from '@/hooks/useLobby.ts'
import { usePlayer } from '@/hooks/usePlayer'
import { useSignalR } from '@/hooks/useSignalR'

const Hands = () => {
  const { lobbyData } = useLobby()
  const { playerData } = usePlayer()
  const { invoke } = useSignalR()

  // Determine the current user's index in the sorted list
  const currentUserIndex = lobbyData.game.sortedPlayers.findIndex(
    (p) => p.name === playerData.player.name,
  )
  console.log(
    `Current user index: ${currentUserIndex} - ${playerData.player.name}`,
  )

  // If found, rotate logic. If not found (spectator?), default to 0.
  const baseIndex = currentUserIndex !== -1 ? currentUserIndex : 0

  // Calculate indices for display positions based on player count
  const totalPlayers = lobbyData.game.sortedPlayers.length
  const positions: {
    index: number
    position: 'bottom' | 'right' | 'top' | 'left'
  }[] = []

  // Always render the current user at the bottom
  positions.push({ index: baseIndex, position: 'bottom' })

  if (totalPlayers === 4) {
    positions.push({ index: (baseIndex + 1) % 4, position: 'right' })
    positions.push({ index: (baseIndex + 2) % 4, position: 'top' })
    positions.push({ index: (baseIndex + 3) % 4, position: 'left' })
  } else console.error(`SortedPlayers length is ${totalPlayers}`)

  const handleCardPlay = async (card: Card, playerIndex: number) => {
    // Only allow current player to play
    // Check if it's strictly the current user's turn AND they are the one clicking
    const player = lobbyData.game.sortedPlayers[playerIndex]

    // Check if the clicked hand belongs to the local player
    if (player.name !== playerData.player.name) {
      console.error("Cannot play opponent's cards")
      return
    }

    // Check if it's actually their turn in the game state
    if (lobbyData.game.currentPlayer.name !== playerData.player.name) {
      console.error('Not your turn!')
      return
    }

    try {
      await invoke('PlayCard', lobbyData.lobby.id, playerData.player.name, card)
      console.log(`Played card: ${card.rank} of ${card.suit}`)
    } catch (err) {
      console.error('Failed to play card:', err)
    }

    // TODO: Send card play to backend via SignalR
    // await invoke({

    // })
    console.log(`Played card: ${card.rank} of ${card.suit}`)
  }
  return (
    <div>
      {/* Player positions: bottom, right, top, left */}
      {positions.map(({ index, position }) => {
        const player = lobbyData.game.sortedPlayers[index]

        // Show only 5 cards during dealing and bidding phase (Belote rules: 5 then 3)
        const visibleCards =
          lobbyData.lobby.gamePhase === 'bidding' ||
          lobbyData.lobby.gamePhase === 'dealing'
            ? player.hand.slice(0, 5)
            : player.hand

        return (
          <PlayerPlate
            key={player.name}
            playerIndex={index}
            playerName={player.name}
            cards={visibleCards}
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
