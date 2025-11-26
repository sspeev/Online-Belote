// hooks
import { useNavigate } from '@tanstack/react-router'
import LiquidGlass from '@nkzw/liquid-glass'
import * as React from 'react'
import back from '../../../assets/svgs/Chevrons left.svg'
import backLight from '../../../assets/svgs/Chevrons leftLight.svg'
import plus from '../../../assets/svgs/plus.svg'
import plusLight from '../../../assets/svgs/PlusLight.svg'
import type { Player } from '@/types/models/Player'
import type { FC } from 'react'
import { usePlayer } from '@/hooks/usePlayer'
import { useLobby } from '@/hooks/useLobby'

// components
import { Background } from '@/app/components/common/Backgound'
import Button from '@/app/components/common/Button'
import Error from '@/app/components/common/Error'

// api
import { create } from '@/api/lobby/endpoints'

// types
import { BtnShape } from '@/types/enums/btnShape'

// icons

const CreateForm: FC = () => {
  const { playerData, dispatchPlayer } = usePlayer()
  const { lobbyData, dispatchLobby } = useLobby()
  const navigate = useNavigate()

  if (!playerData) {
    dispatchLobby({
      type: 'SET_ERROR',
      message: lobbyData.error || 'Unknown error',
    })
    return <Error />
  } // Or a loading spinner

  const handlePlayerNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const updatedPlayer: Player = {
      ...playerData.player,
      name: e.target.value,
    }
    dispatchPlayer({ type: 'SET_PLAYER', payload: updatedPlayer })
  }

  const handleLobbyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchPlayer({ type: 'SET_LOBBY_NAME', payload: e.target.value })
  }

  const handleCreateLobby = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // API Call
    const response = await create({
      playerName: playerData.player.name,
      lobbyName: playerData.lobbyName,
    })
    if (!response.data) {
      return <Error />
    }
    const selectedLobbyId: number = response.data.lobby.id

    const updatedPlayer: Player = {
      ...playerData.player,
      lobbyId: selectedLobbyId,
      status: "Connected",
      host: true
    }
    dispatchPlayer({ type: 'SET_PLAYER', payload: updatedPlayer })

    await navigate({
      to: '/lobby/$lobbyId/waiting',
      params: { lobbyId: selectedLobbyId.toString() },
    })
  }

  return (
    <section className="create-container h-screen relative overflow-hidden">
      <Background />
      <form
        onSubmit={handleCreateLobby}
        className="absolute top-70 left-1/2 lg:top-90 lg:left-1/2 flex flex-col gap-10 lg:gap-20 justify-center items-center"
      >
        <LiquidGlass borderRadius={40}>
          <h2 className="text-3xl mb-5 text-center text-white">Create Lobby</h2>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Player name"
              value={playerData.player.name}
              onChange={handlePlayerNameChange}
              className="border-white rounded-xl border-2 p-2 text-white placeholder:text-gray-300 placeholder:text-xl"
              required
            />
            <input
              type="text"
              placeholder="Lobby name"
              value={playerData.lobbyName}
              onChange={handleLobbyNameChange}
              className="border-white rounded-xl border-2 p-2 text-white placeholder:text-gray-300 placeholder:text-xl"
              required
            />
          </div>

          <div className="flex justify-between items-center mt-4 gap-4">
            <Button
              additionalStyles="border-2"
              liquid={false}
              icon={back}
              iconLight={backLight}
              shape={BtnShape.MAIN}
              path="/"
              text="Back"
            />

            <Button
              additionalStyles="border-2"
              liquid={false}
              icon={plus}
              iconLight={plusLight}
              shape={BtnShape.MAIN}
              submit={true}
              text="Create"
            />
          </div>
        </LiquidGlass>
      </form>
    </section>
  )
}

export default CreateForm
