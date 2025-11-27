import { useLobby } from '@/hooks/useLobby.ts'
import { usePlayer } from '@/hooks/usePlayer.ts'
import { Background } from '@/app/components/common/Backgound.tsx'
import Button from '@/app/components/common/Button.tsx'
import { BtnShape } from '@/types/enums/btnShape.ts'
import { useEffect } from 'react'
import { find, leave } from '@/api/lobby/endpoints/index.ts'
import type { Player } from '@/types/models/Player.ts'
import PlayerBox from '@/app/components/lobby/PlayerBox.tsx'
import { useNavigate } from '@tanstack/react-router'

const Waiting = () => {
  const {
    lobbyData: { lobby },
    dispatchLobby,
  } = useLobby()
  const { playerData, dispatchPlayer } = usePlayer()
  // const {
  //   lobbyData: { lobby, error },
  // } = useLobby();
  const navigate = useNavigate()

  useEffect((): void => {
    const fetchLobby = async () => {

      const response = await find(playerData.player.lobbyId)
      if (!response.data) {
        console.error('Failed to fetch lobby')
        return
      }
      dispatchLobby({ type: 'SET_LOBBY', lobby: response.data.lobby })
    }

    fetchLobby().catch(console.error)
  }, [])

  const handleLeaveLobby = async () => {
    const response = await leave({
      playerName: playerData.player.name,
      lobbyId: playerData.selectedLobbyId,
    })

    if (!response.data) {
      console.error('Failed to fetch lobbies')
      dispatchPlayer({
        type: 'SET_ERROR',
        message: 'Failed to join lobby',
      })
      return
    }

    const updatedPlayer: Player = {
      ...playerData.player,
      lobbyId: 0,
      host: false,
      status: 'Disconnected'
    }
    dispatchPlayer({ type: 'SET_PLAYER', payload: updatedPlayer })
    dispatchPlayer({ type: 'SET_SELECTED_LOBBY_ID', payload: 0 })

    await navigate({
      to: '/'
    })
  }

  const handleStartGame = async () => {
    //await startGame()
  }

  return (
    <section className="create-container h-screen relative overflow-hidden">
      <Background />
      <main className="container top-10 lg:top-10 lg:left-10 absolute mx-auto flex flex-col items-center">
        <header className="w-full flex flex-col lg:flex-row justify-center items-center bg-gradient-to-b from-secondary-light to-secondary-dark rounded-xl p-8 mb-10">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-28 items-center mb-6 lg:mb-0">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-4xl text-center font-semibold font-default text-text-light">
                {lobby.name}
              </h2>
              <p className="text-white text-xl font-semibold font-default capitalize">
                Status: {lobby.gamePhase}
              </p>
            </div>
            <div className="button-wrapper w-25 flex flex-row-reverse lg:flex-col-reverse justify-center gap-25 lg:gap-10">
              <div className="button relative">
                <Button
                  text={'Leave'}
                  liquid={true}
                  onClick={handleLeaveLobby}
                  shape={BtnShape.MAIN}
                />
              </div>
              {playerData.player.host && (
                <div className="button relative">
                  <Button
                    text={'Start'}
                    shape={BtnShape.MAIN}
                    liquid={true}
                    onClick={handleStartGame}
                    additionalStyles={
                      lobby.playerCount < 4
                        ? 'opacity-50 pointer-events-none'
                        : ''
                    }
                  />
                </div>
              )}
            </div>
          </div>

            <div className="divider block w-50 lg:h-30 h-px lg:w-px bg-white/30 my-5 lg:mx-3"></div>
            <div className="text-center text-text-light text-xl lg:text-4xl font-semibold font-default max-w-lg">
              BELOTE ENGINE STAGE DEVELOPMENT
            </div>
        </header>
        <section className="w-full h-52 flex flex-wrap flex-row items-center justify-center gap-52 lg:gap-80">
          {lobby.connectedPlayers.map((player : Player) => (
            <PlayerBox player={player} />
            ))}
        </section>
      </main>
    </section>
  )
}

export default Waiting
