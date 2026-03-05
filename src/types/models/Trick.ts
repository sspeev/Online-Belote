import type { Player } from './Player'
import type { Card } from './Card'

export type PlayedCardEntry = {
  player: Player
  card: Card
}

export type Trick = {
  playedCards: Array<PlayedCardEntry> | null
  isComplete: boolean
  winner?: Player
  pointsValue?: number
}
