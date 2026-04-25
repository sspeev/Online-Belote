import type { Card } from '@/types/models/Card'
import { PlayerPlate } from './PlayerPlate'
import { useLobby } from '@/hooks/useLobby.ts'
import { usePlayer } from '@/hooks/usePlayer'
import { useSignalR } from '@/hooks/useSignalR'

const Hands = () => {
  const { lobbyData } = useLobby()
  const { playerData } = usePlayer()
  const { invoke } = useSignalR()

  const currentUserIndex = lobbyData.game.sortedPlayers.findIndex(
    (p) => p.name === playerData.player.name,
  )

  const baseIndex = currentUserIndex !== -1 ? currentUserIndex : 0

  const totalPlayers = lobbyData.game.sortedPlayers.length
  const positions: {
    index: number
    position: 'bottom' | 'right' | 'top' | 'left'
  }[] = []

  positions.push({ index: baseIndex, position: 'bottom' })

  if (totalPlayers === 4) {
    positions.push({ index: (baseIndex + 1) % 4, position: 'right' })
    positions.push({ index: (baseIndex + 2) % 4, position: 'top' })
    positions.push({ index: (baseIndex + 3) % 4, position: 'left' })
  } else console.error(`SortedPlayers length is ${totalPlayers}`)

  const handleCardPlay = async (card: Card, playerIndex: number) => {
    const player = lobbyData.game.sortedPlayers[playerIndex]

    if (player.name !== playerData.player.name) {
      console.error("Cannot play opponent's cards")
      return
    }

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
  }

  return (
    <div>
      {positions.map(({ index, position }) => {
        const player = lobbyData.game.sortedPlayers[index]

        // Show only 5 cards during dealing and bidding phases (Belote rules: 5 then 3)
        const visibleCards =
          lobbyData.lobby.gamePhase === 'bidding' ||
          lobbyData.lobby.gamePhase === 'dealing'
            ? player.hand.slice(0, 5)
            : player.hand

        return (
          <section className=''>
            <PlayerPlate
              key={player.name}
              playerIndex={index}
              playerName={player.name}
              cards={visibleCards}
              position={position}
              onCardClick={(card) => handleCardPlay(card, index)}
              isCurrentPlayer={player.name === playerData.player.name}
            />
          </section>
        )
      })}
    </div>
  )
}

export default Hands
