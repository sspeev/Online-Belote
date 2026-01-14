import { Club, Diamond, Heart, Spade } from 'lucide-react'
import { useLobby } from '@/hooks/useLobby'

type BiddingProps = {
  setShowBidding: React.Dispatch<React.SetStateAction<boolean>>
}

const BiddingPanel = (props: BiddingProps) => {
  const { setShowBidding } = props
  const { lobbyData, dispatchLobby } = useLobby();

  const handleBidding = (bid: "hearts" | "diamonds" | "clubs" | "spades" | "No trump" | "All trump" | "pass") => {

    //dispatchLobby({ type: 'SET_CURRENT_ANNOUNCE', currentAnnounce: bid})
    console.log(lobbyData.lobby.game.currentAnnounce)
    setShowBidding(false)
  }

  return (
    <>
      {/*Blur Overlay*/}
      <div
        onClick={() => setShowBidding(false)}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
        <div className="flex flex-row flex-wrap gap-10 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/60 p-6">
          <button
            onClick={() => handleBidding("clubs")}
            className="w-36 h-16 rounded-full bg-neutral-200/60 hover:bg-red-300 flex items-center justify-center transition-colors"
          >
            <Club width={'50px'} height={'50px'} fill={'black'} />
          </button>
          <button
            onClick={() => handleBidding("diamonds")}
            className="w-36 h-16 rounded-full bg-neutral-200/60 hover:bg-red-300 flex items-center justify-center transition-colors"
          >
            <Diamond width={'50px'} height={'50px'} fill={'red'} />
          </button>
          <button
            onClick={() => handleBidding("hearts")}
            className="w-36 h-16 rounded-full bg-neutral-200/60 hover:bg-red-300 flex items-center justify-center transition-colors"
          >
            <Heart width={'50px'} height={'50px'} fill={'red'} />
          </button>
          <button
            onClick={() => handleBidding("spades")}
            className="w-36 h-16 rounded-full bg-neutral-200/60 hover:bg-red-300 flex items-center justify-center transition-colors"
          >
            <Spade width={'50px'} height={'50px'} fill={'black'} />
          </button>
          <button
            onClick={() => handleBidding("No trump")}
            className="w-36 h-16 rounded-full bg-neutral-200/60 hover:bg-red-300 flex items-center justify-center transition-colors"
          >
            <span className={'font-bold text-xl'}>A</span>
          </button>
          <button
            onClick={() => handleBidding("All trump")}
            className="w-36 h-16 rounded-full bg-neutral-200/60 hover:bg-red-300 flex items-center justify-center transition-colors"
          >
            <span className={'font-bold text-xl'}>J</span>
          </button>
          <button
            onClick={() => handleBidding("pass")}
            className="w-36 h-16 rounded-full bg-neutral-200/60 hover:bg-red-300 flex items-center justify-center transition-colors"
          >
            <span className={'font-bold text-xl'}>PASS</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default BiddingPanel
