import * as React from 'react'

//hooks
import { usePlayer } from '@/hooks/usePlayer'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useCallback } from 'react'
import { useSignalR } from '@/hooks/useSignalR.ts'

//components
import { Background } from '../common/Backgound'
import LiquidGlass from '@nkzw/liquid-glass'
import Button from '../common/Button'

//types
import { BtnShape } from '@/types/enums/btnShape'
import type { Player } from '@/types/models/Player'
import type { Lobby } from '@/types/models/Lobby.ts'
import { type FC } from 'react'

//icons
import plus from '../../../assets/svgs/Plus.svg'
import plusLight from '../../../assets/svgs/PlusLight.svg'
import back from '../../../assets/svgs/Chevrons left.svg'
import backLight from '../../../assets/svgs/Chevrons leftLight.svg'

// api
import { allLobbies, joinLobby } from '@/api/services/LobbyService.ts'


const JoinForm: FC = () => {
  const { playerData, dispatchPlayer } = usePlayer()
  const navigate = useNavigate()
  const { connect, disconnect } = useSignalR()

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

    try {
      const lobbyId = await joinLobby(playerData, dispatchPlayer)
      await connect(lobbyId)

      await navigate({
        to: '/lobby/$lobbyId/waiting',
        params: { lobbyId: lobbyId.toString() },
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to join lobby'
      console.error('Failed to join lobby:', errorMessage)
      dispatchPlayer({ type: 'SET_ERROR', message: errorMessage })
    }
  }

  const refreshLobbies = useCallback(async () => {
    try {
      await allLobbies(dispatchPlayer)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to refresh lobbies'
      console.error('Failed to refresh lobbies:', errorMessage)
    }
  }, [dispatchPlayer])

  useEffect((): void => {
    refreshLobbies()
  }, [refreshLobbies])

  useEffect(() => {
    return () => {
      disconnect().catch(console.error)
    }
  }, [disconnect])

  return (
    <section className="create-container h-screen relative overflow-hidden">
      <Background />
      <form
        onSubmit={handleJoinLobby}
        className="absolute top-70 left-1/2 lg:top-90 lg:left-1/2 flex flex-col gap-10 lg:gap-20 justify-center items-center"
      >
        <LiquidGlass borderRadius={40}>
          <div className="flex flex-col w-full justify-center gap-5 py-20 px-0.5 lg:py-10 lg:px-10">
            <legend className="text-3xl text-text-dark dark:text-text-light">
              Join Lobby
            </legend>
            <input
              type="text"
              placeholder="Player name"
              value={playerData.player.name}
              onChange={handlePlayerNameChange}
              className="border-white rounded-xl border-2 text-base py-1 px-2"
            />
            <section className="button-wrapper flex flex-row justify-between px-10">
              <Button
                path="/"
                text="Back"
                shape={BtnShape.MAIN}
                liquid={false}
                icon={back}
                iconLight={backLight}
                additionalStyles="border-2 z-10"
              />

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
            </section>
            {playerData.availableLobbies.length == 0 ? (
              <p className="mt-5 text-sm lg:text-xl text-center">
                No available lobbies. Create one instead or refresh!
              </p>
            ) : (
              <div className="lobbies-list flex flex-row flex-wrap justify-center gap-4 max-h-[300px] overflow-y-auto">
                <p className=" text-center text-primary-dark text-xl mt-5 font-semibold font-default">
                  Available Lobbies:
                </p>
                {playerData.availableLobbies?.map((lobby: Lobby) => (
                  <article
                    key={lobby.id}
                    className={`lobby-item ${playerData.selectedLobbyId === lobby.id ? 'selected' : ''} w-50 flex gap-3 items-center py-1 px-2 border-2 border-gray-100 dark:border-text-light rounded-xl`}
                  >
                    <div className="lobby-info">
                      <h5 className="text-text-dark dark:text-text-light text-xl font-semibold font-default">
                        {lobby.name || `Lobby ${lobby.id}`}
                      </h5>
                      <p className="text-text-dark dark:text-text-light text-sm font-default">
                        Players: {lobby.playerCount}/4
                      </p>
                      <p className="text-text-dark dark:text-text-light text-sm font-default">
                        Status: {lobby.gamePhase}
                      </p>
                    </div>
                    <button
                      type="submit"
                      onClick={(): void =>
                        handleSelectedLobbyIdChange(lobby.id)
                      }
                      className="rounded-xl px-2 py-1 border-white border-2"
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
