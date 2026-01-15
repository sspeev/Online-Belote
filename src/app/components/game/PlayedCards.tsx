import { Card as GameCard } from './Card'
import type { Card } from '@/types/models/Card'

type PlayedCardsProps = {
  tableCards: Array<Card | null>
}


const PlayedCards = ({ tableCards }: PlayedCardsProps) => {
    
  return (
    <>
      {/* Played cards on table - positioned around the center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] z-10">
        {/* Player 1 card - bottom of table */}
        <div className="absolute z-10 bottom-8 left-1/2 -translate-x-1/2">
          {tableCards[0] && (
            <div
              style={{
                animation:
                  'springIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
              }}
            >
              <GameCard
                isOpponent={false} 
                card={tableCards[0]}
                size="normal"
                rotation={0}
              />
            </div>
          )}
        </div>

        {/* Player 2 card - right of table */}
        <div className="absolute z-10 right-40 top-1/2 -translate-y-1/2">
          {tableCards[1] && (
            <div>
              <GameCard
                isOpponent={false} 
                card={tableCards[1]}
                size="normal"
                rotation={0}
              />
            </div>
          )}
        </div>
        {/* Player 3 card - top of table */}
        <div className="absolute z-10 top-8 left-1/2 -translate-x-1/2">
          {tableCards[2] && (
            <div>
              <GameCard
                isOpponent={false} 
                card={tableCards[2]}
                size="normal"
                rotation={0}
              />
            </div>
          )}
        </div>
        {/* Player 4 card - left of table */}
        <div className="absolute z-10 left-40 top-1/2 -translate-y-1/2">
          {tableCards[3] && (
            <div>
              <GameCard
                isOpponent={false} 
                card={tableCards[3]}
                size="normal"
                rotation={0}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default PlayedCards
