//import { GameProvider } from '@/context/game/GameProvider.tsx'
import GameBoard from '@/app/components/game/GameBoard.tsx'
//import { useLobby } from '@/hooks/useLobby.ts'

const GameLayout = () => {
    //const { lobbyData } = useLobby()

    return (
        //<GameProvider lobbyId={lobbyData.lobby.id}>
            <GameBoard />
        //</GameProvider>
    )
}

export default GameLayout;