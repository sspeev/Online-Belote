//import { GameProvider } from '@/context/game-temp/GameProvider.tsx'
import GameBoard from '@/app/components/game-temp/GameBoard.tsx'
//import { useLobby } from '@/hooks/useLobby.ts'

const GameLayout = () => {
    //const { lobbyData } = useLobby()

    return (
        //<GameProvider lobbyId={lobbyData.lobby-temp.id}>
            <GameBoard />
        //</GameProvider>
    )
}

export default GameLayout;