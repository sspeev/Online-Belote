import { Club, Diamond, Heart, Spade } from 'lucide-react'

type BidType =
  | 'hearts'
  | 'diamonds'
  | 'clubs'
  | 'spades'
  | 'No trump'
  | 'All trump'
  | 'pass'

const BiddingPanel = () => {

  const handleBidding = (bid: BidType) => {
    //dispatchLobby({ type: 'SET_CURRENT_ANNOUNCE', currentAnnounce: bid})
    console.log('Bid selected:', bid)
  }

  const bids: {
    type: BidType
    icon?: typeof Club
    fill?: string
    label?: string
  }[] = [
    { type: 'clubs', icon: Club, fill: 'black' },
    { type: 'diamonds', icon: Diamond, fill: 'red' },
    { type: 'hearts', icon: Heart, fill: 'red' },
    { type: 'spades', icon: Spade, fill: 'black' },
    { type: 'No trump', label: 'A' },
    { type: 'All trump', label: 'J' },
    { type: 'pass', label: 'PASS' },
  ]

  const handleGamePhaseChange = () => {
    // dispatchLobby({
    //   type: 'SET_LOBBY',
    //   lobby: {
    //     ...lobbyData.lobby,
    //     gamePhase: 'dealing',
    //   },
    //   game: lobbyData.game,
    // })
  }
  return (
    <>
      {/*Blur Overlay*/}
      <div
        onClick={() => handleGamePhaseChange()}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
        <div className="flex flex-row flex-wrap gap-10 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/60 p-6">
          {bids.map((bid) => (
            <button
              key={bid.type}
              onClick={() => handleBidding(bid.type)}
              className="w-36 h-16 rounded-full bg-neutral-200/60 hover:bg-red-300 flex items-center justify-center transition-colors"
            >
              {bid.icon ? (
                <bid.icon width={'50px'} height={'50px'} fill={bid.fill} />
              ) : (
                <span className={'font-bold text-xl'}>{bid.label}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default BiddingPanel
