import { GameProvider } from '@/context/game/Provider.tsx'
import { GameBoard } from '@/app/components/game/GameBoard.tsx'
//import { AnimatedBackground } from '@/app/components/common/AnimatedBackground.tsx'

const GameLayout = () => {

  return (
    <GameProvider>
    <div className="relative min-h-screen overflow-hidden">
        <GameBoard />
    </div>
    </GameProvider>
  )
}

export default GameLayout
