//hooks
import { usePlayer } from '@/hooks/usePlayer'
import { useLobby } from '@/hooks/useLobby'
import { useNavigate } from '@tanstack/react-router'

//components
import { Background } from '../common/Backgound'
import LiquidGlass from '@nkzw/liquid-glass'
import Button from '../common/Button'

//api
import { all, join } from '@/api/lobby/endpoints'

//types
import { BtnShape } from '@/types/enums/btnShape'
import type { Player } from '@/types/models/Player'
import { type FC } from 'react'

//icons
import plus from '../../../assets/svgs/plus.svg'
import plusLight from '../../../assets/svgs/PlusLight.svg'
import back from '../../../assets/svgs/Chevrons left.svg'
import backLight from '../../../assets/svgs/Chevrons leftLight.svg'
import * as React from 'react'
import type { Lobby } from '@/types/models/Lobby.ts'

const JoinForm: FC = () => {
  const { playerData, dispatchPlayer } = usePlayer()
  const { lobbyData, dispatchLobby } = useLobby()
  const navigate = useNavigate()

  const handlePlayerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedPlayer: Player = {
      ...playerData.player,
      name: e.target.value,
    }
    dispatchPlayer({ type: 'SET_PLAYER', payload: updatedPlayer })
  }

  const handleSelectedLobbyIdChange: (lobbyId: number) => void = (
    lobbyId: number,
  ): void => {
    dispatchPlayer({ type: 'SET_SELECTED_LOBBY_ID', payload: lobbyId })
  }

  const handleJoinLobby = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await join({
      playerName: playerData.player.name,
      selectedLobbyId: playerData.selectedLobbyId,
    })
    if (!response.data) {
      console.error('Failed to fetch lobbies')
      dispatchLobby({
        type: 'SET_ERROR',
        message: 'Failed to join lobby', // Corrected this line
      })
      return
    }
    const lobbyId: number = response.data.lobby?.id

    await navigate({
      to: '/lobby/$lobbyId/waiting',
      params: { lobbyId: lobbyId.toString() },
    })
  }

  const refreshLobbies = async () => {
    const response = await all()
    if (!response.data) {
      console.error('Failed to fetch lobbies')
      dispatchLobby({
        type: 'SET_ERROR',
        message: 'Failed to fetch lobbies',
      })
      return
    }
    console.log(lobbyData.availableLobbies)
    console.log(response.data)
    dispatchLobby({
      type: 'SET_AVAILABLE_LOBBIES',
      lobbies: response.data.lobbies,
    })
  }

  return (
    <section className="create-container h-screen relative overflow-hidden">
      <Background />
      <form
        onSubmit={handleJoinLobby}
        className="absolute top-70 left-1/2 lg:top-90 lg:left-1/2 flex flex-col gap-10 lg:gap-20 justify-center items-center"
      >

        <LiquidGlass borderRadius={40}>
          <div className="flex flex-col w-full justify-center gap-5 py-20 px-0.5 lg:py-20 lg:px-10">
            <h2 className="text-3xl">Join Lobby</h2>
            <input
              type="text"
              placeholder="Player name"
              value={playerData.player.name}
              onChange={handlePlayerNameChange}
              className="border-white rounded-xl border-2 text-base py-1 px-2"
            />
            <section className="button-wrapper flex flex-row justify-between px-10">
              <div onClick={refreshLobbies}>
                <Button
                  text="Refresh"
                  shape={BtnShape.MAIN}
                  liquid={false}
                  icon={plus}
                  iconLight={plusLight}
                  additionalStyles="border-2 z-10"
                />
              </div>

              <Button
                path="/"
                text="Back"
                shape={BtnShape.MAIN}
                liquid={false}
                icon={back}
                iconLight={backLight}
                additionalStyles="border-2 z-10"
              />

            </section>
            {lobbyData.availableLobbies.length == 0 ? (
              <p className="mt-5 text-sm lg:text-xl text-center">
                No available lobbies. Create one instead or refresh!
              </p>
            ) : (
              <div className="lobbies-list flex flex-row flex-wrap justify-center gap-4 max-h-[300px] overflow-y-auto">
                <p className=" text-center text-primary-dark text-xl mt-5 font-semibold font-default">
                  Available Lobbies:
                </p>
                {lobbyData.availableLobbies?.map((lobby : Lobby) => (
                  <article
                    key={lobby.id}
                    className={`lobby-item ${playerData.selectedLobbyId === lobby.id ? 'selected' : ''} w-40 flex gap-2 items-center pl-3 bg-dirty-white rounded-xl`}
                  >
                    <div className="lobby-info">
                      <h5 className="text-black text-xl font-semibold font-default">
                        {lobby.name || `Lobby ${lobby.id}`}
                      </h5>
                      <p className="text-black text-sm font-default">
                        Players: {lobby.connectedPlayers.length}/4
                      </p>
                      <p className="text-black text-sm font-default">
                        Status: {lobby.gamePhase}
                      </p>
                    </div>
                    <button
                      onClick={(): void =>
                        handleSelectedLobbyIdChange(lobby.id)
                      }
                      className="bg-gradient-to-l from-primary-dark to-primary-light rounded-xl shadow-[inset_0px_4px_12px_0px_rgba(0,0,0,0.20)]"
                    >
                      <p className="text-white text-sm font-semibold font-default">
                        Join
                      </p>
                    </button>
                  </article>
                ))}
              </div>
            )}
          </div>
        </LiquidGlass>
      </form>
    </section>
  )
}

export default JoinForm
