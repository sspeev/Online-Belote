
// hooks
import { useLobby } from '@/hooks/useLobby.ts'
import { usePlayer } from '@/hooks/usePlayer.ts'
import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'

// components
import { Background } from '@/app/components/common/Backgound.tsx'
import Button from '@/app/components/common/Button.tsx'
import PlayerBox from '@/app/components/lobby/PlayerBox.tsx'

// types
import { BtnShape } from '@/types/enums/btnShape.ts'
import type { Player } from '@/types/models/Player.ts'

// api
import { findLobby, leaveLobby } from '@/api/services/LobbyService.ts'

const Waiting = () => {
  const {
    lobbyData,
    dispatchLobby
  } = useLobby()

  const { playerData, dispatchPlayer } = usePlayer()
  const navigate = useNavigate()

  useEffect((): void => {
    findLobby(dispatchLobby, playerData).catch(console.error)
  }, [])

  const handleLeaveLobby = async () => {
    await leaveLobby(playerData, dispatchPlayer, lobbyData, dispatchLobby)
    await navigate({
      to: '/',
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
                {lobbyData.lobby.name}
              </h2>
              <p className="text-white text-xl font-semibold font-default capitalize">
                Status: {lobbyData.lobby.gamePhase}
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
                      lobbyData.lobby.playerCount < 4
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
          {lobbyData.lobby.connectedPlayers.map((player: Player) => (
            <PlayerBox player={player} />
          ))}
        </section>
      </main>
    </section>
  )
}

export default Waiting
