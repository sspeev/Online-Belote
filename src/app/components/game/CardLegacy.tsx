
type Card = {
  id: number;
  suit: string;
  value: string;
  color: string;
  power: number;
};

type CardProps = {
  card: Card;
  onClick?: () => void;
  isClickable?: boolean;
  isOpponent?: boolean;
  size?: 'small' | 'normal';
  rotation?: number;
};

const suitIcons = {
  diamond: '♦',
  heart: '♥',
  club: '♠',
  spade: '♣',
}

const suitColors = {
  diamond: 'text-red-600',
  heart: 'text-red-600',
  club: 'text-neutral-700',
  spade: 'text-neutral-700',
};

const Card = ({ card }: CardProps) => {
  const cardSkinFont = 'SF_Compact_Rounded'
  const cardImage = `${card.value}_${card.suit}.png`


  const getSuitSymbol = () => {
    const symbols = {
      Hearts: suitIcons.heart,
      Diamonds: suitIcons.diamond,
      Spades: suitIcons.spade,
      Clubs: suitIcons.club,
    }
    switch (card.suit) {
      case 'Hearts': return symbols.Hearts
      case 'Diamonds': return symbols.Diamonds
      case 'Spades': return symbols.Spades
      case 'Clubs': return symbols.Clubs
      default: return undefined
    }
  }

  const getSuitColor = () => {
    const symbols = {
      Hearts: suitColors.heart,
      Diamonds: suitColors.diamond,
      Spades: suitColors.spade,
      Clubs: suitColors.club,
    }
    switch (card.suit) {
      case 'Hearts': return symbols.Hearts
      case 'Diamonds': return symbols.Diamonds
      case 'Spades': return symbols.Spades
      case 'Clubs': return symbols.Clubs
      default: return symbols.Clubs
    }
  }

  return (
    <>
      <div className="w-[220px] h-72 flex flex-row bg-white rounded-[10px] shadow-[0px_4px_8px_0px_rgba(157,179,206,1.00)]">
        <div className="upper-wrapper items-center w-[1em] h-full flex flex-col m-1">
          <div
            className={`upper-value text-${getSuitColor()} text-4xl font-['${cardSkinFont}']`}
          >
            {card.value}
          </div>
          <div
            className={`upper-suit text-${getSuitColor()} text-4xl font-['${cardSkinFont}']`}
          >
            {getSuitColor()}
          </div>
        </div>
        <img
          className="w-sm h-auto mt-5 mb-5 ml-2 mr-2 outline-[2px] outline-black"
          src={cardImage}
        />
        <div className="lower-wrapper items-center w-[1em] h-full flex flex-col m-1 -rotate-180">
          <div
            className={`lower-value text-${getSuitColor()} text-4xl font-['${cardSkinFont}']`}
          >
            {card.value}
          </div>
          <div
            className={`lower-suit text-${getSuitColor()} text-4xl font-['${cardSkinFont}']`}
          >
            {getSuitSymbol()}
          </div>
        </div>
      </div>
    </>
  )
}

export default Card
