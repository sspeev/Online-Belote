import { GameProvider } from '@/context/game/Provider.tsx'
import { GameBoard } from '@/app/components/game/GameBoard.tsx'
import { useLobby } from '@/hooks/useLobby.ts'
//import { AnimatedBackground } from '@/app/components/common/AnimatedBackground.tsx'

const GameLayout = () => {
  const { lobbyData } = useLobby()

  return (
    <GameProvider lobbyId={lobbyData.lobby.id}>
    <div className="relative min-h-screen overflow-hidden">
        <GameBoard />
    </div>
    </GameProvider>
  )
}

export default GameLayout
