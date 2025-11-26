import { useLobby } from '@/hooks/useLobby.ts'
import { usePlayer } from '@/hooks/usePlayer.ts'
import { Background } from '@/app/components/common/Backgound.tsx'
import Button from '@/app/components/common/Button.tsx'
import { BtnShape } from '@/types/enums/btnShape.ts'
import { useEffect } from 'react'
import { find } from '@/api/lobby/endpoints/index.ts'

const Waiting = () => {
  const {
    lobbyData,
    dispatchLobby,
  } = useLobby()
  const { playerData } = usePlayer()

  useEffect(() => {
    // only fetch when we have a valid lobbyId
    const lobbyId = playerData?.player?.lobbyId
    if (!lobbyId) return

    const fetchLobby = async () => {
      const response = await find(lobbyId)
      console.log('res:')
      console.log(response)
      if (!response?.data) {
        console.error('Failed to fetch lobby')
        return
      }

      // update context with the received lobby
      dispatchLobby({ type: 'SET_LOBBY', lobby: response.data.lobby })

      // state updates are async — logging lobbyData here will show the previous state
      // if you need to react to the updated lobby, use another useEffect that depends on lobbyData
      console.log('dispatched lobby update (response lobby):', response.data.lobby)
    }

    fetchLobby().catch(console.error)
  // add dependencies so effect reruns when lobbyId or dispatch changes
  }, [playerData?.player?.lobbyId, dispatchLobby])

  const handleLeaveLobby = async () => {
    console.log(lobbyData)
  }

  const handleStartGame = async () => {
    //await startGame()
  }

  return (
    <section className="create-container h-screen relative overflow-hidden">
      <Background />
      <main className="container top-10 lg:top-10 lg:left-10 absolute mx-auto flex flex-col items-center">
        <header className="w-full max-w-xs lg:max-w-3xl flex flex-col lg:flex-row justify-between items-center bg-gradient-to-b from-secondary-light to-secondary-dark rounded-xl p-8 mb-10">
          <div className="flex flex-col lg:flex-row gap-3 items-center mb-6 lg:mb-0">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-4xl font-semibold font-default text-text-light">
                {/*{lobby.name}*/}
              </h2>
              <p className="text-white text-xl font-semibold font-default capitalize">
                {/*{lobby.gamePhase}*/}
              </p>
            </div>
            <div className="button-wrapper">
              <div>
                <Button
                  text={'Leave'}
                  liquid={true}
                  onClick={handleLeaveLobby}
                  shape={BtnShape.MAIN}
                />
              </div>
              {playerData.player.host && (
                <button
                  className="w-25 disabled:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleStartGame}
                  // disabled={lobby.playerCount < 4}
                >
                  <p className="text-contrast">Start</p>
                </button>
              )}
            </div>
          </div>
          <div className="divider hidden lg:block h-30 w-px bg-white/30 mx-3"></div>
          <div className="text-center text-text-light text-xl lg:text-4xl font-semibold font-['Poppins'] max-w-lg">
            BELOTE ENGINE STAGE DEVELOPMENT
          </div>
        </header>
        {/*<PlayerList />*/}
        <section className="text-sm text-white/70 mt-6">
          If the host leaves, the lobby closes.
        </section>
      </main>
    </section>
  )
}

export default Waiting
