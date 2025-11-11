
import { GameProvider } from '@/context/GameContext'

function GamePage() {
    const { lobbyId } = Route.useParams()

    return (
        <GameProvider lobbyId={lobbyId}>
            <GameBoard />
        </GameProvider>
    )
}