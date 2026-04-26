import { useNavigate } from '@tanstack/react-router'
import * as React from 'react'
import { useState, type FC } from 'react'
import type { Player } from '@/types/models/Player'
import { usePlayer } from '@/hooks/usePlayer'
import { useSignalR } from '@/hooks/useSignalR.ts'
import { createLobby } from '@/api/services/LobbyService.ts'

//svgs
import arrowRight from '@/assets/svgs/Chevrons right.svg'

const CreateForm: FC = () => {
  const { playerData, dispatchPlayer } = usePlayer()
  const navigate = useNavigate()
  const { invoke, connect } = useSignalR()
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
    if (isLoading) return
    setIsLoading(true)

    try {
      const selectedLobbyId = await createLobby(playerData, dispatchPlayer)
      await connect(selectedLobbyId)

      await invoke('JoinLobby', {
        playerName: playerData.player.name,
        lobbyId: selectedLobbyId,
        lobbyName: playerData.lobbyName,
      })

      await navigate({
        to: '/lobby/$lobbyId/waiting',
        params: { lobbyId: selectedLobbyId.toString() },
      })
    } catch (error) {
      console.error('Failed to create lobby', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-brand-offwhite text-brand-charcoal dark:bg-background-dark dark:text-slate-100 transition-colors duration-200">
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-28">
        <div className="w-full max-w-xl bg-white border border-brand-softgray shadow-[0_4px_12px_rgba(45,45,45,0.08)] rounded-3xl p-8 md:p-12 dark:bg-brand-charcoal/30 dark:border-slate-800">
          {/* Screen Heading */}
          <div className="mb-10">
            <nav className="flex items-center gap-2 text-gray-400 mb-4 text-xs font-bold uppercase tracking-widest">
              <span
                className="hover:text-brand-burnt transition-colors cursor-pointer"
                onClick={() => navigate({ to: '/' })}
              >
                Home
              </span>
              <img src={arrowRight} alt="arrow-right" className="size-5" />
              <span className="text-brand-charcoal dark:text-slate-100">
                Create New
              </span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-charcoal dark:text-white tracking-tight mb-2">
              New Lobby
            </h1>
            <p className="text-gray-500 dark:text-slate-400 text-lg">
              Set up your lobby so your friends can join.
            </p>
          </div>
          {/* Form Section */}
          <form className="space-y-8" onSubmit={handleCreateLobby}>
            <div className="space-y-6">
              {/* Player Name Input */}
              <div className="group">
                <label
                  className="block text-[10px] font-bold text-gray-400 dark:text-slate-400 uppercase tracking-[0.2em] mb-2 px-1"
                  htmlFor="player-name"
                >
                  Player Name
                </label>
                <div className="relative">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-burnt transition-colors size-7"
                  >
                    <path
                      d="M26.6667 28V25.3333C26.6667 23.9188 26.1048 22.5623 25.1046 21.5621C24.1044 20.5619 22.7479 20 21.3334 20H10.6667C9.25222 20 7.89567 20.5619 6.89547 21.5621C5.89528 22.5623 5.33337 23.9188 5.33337 25.3333V28M21.3334 9.33333C21.3334 12.2789 18.9456 14.6667 16 14.6667C13.0545 14.6667 10.6667 12.2789 10.6667 9.33333C10.6667 6.38781 13.0545 4 16 4C18.9456 4 21.3334 6.38781 21.3334 9.33333Z"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <input
                    className="w-full pl-12 pr-4 py-4 bg-brand-offwhite border border-brand-softgray rounded-2xl focus:border-brand-burnt focus:ring-2 focus:ring-brand-burnt/20 outline-none transition-all placeholder:text-gray-300 dark:bg-slate-900/50 dark:border-slate-800 dark:placeholder:text-slate-600 text-brand-charcoal dark:text-white font-medium"
                    id="player-name"
                    placeholder="e.g. GarazhZaPrishki"
                    type="text"
                    value={playerData.player.name}
                    onChange={handlePlayerNameChange}
                    required
                  />
                </div>
              </div>
              {/* Lobby Name Input */}
              <div className="group">
                <label
                  className="block text-[10px] font-bold text-gray-400 dark:text-slate-400 uppercase tracking-[0.2em] mb-2 px-1"
                  htmlFor="lobby-name"
                >
                  Lobby Name
                </label>
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="currentColor"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-burnt transition-colors size-7"
                  >
                    <path
                      d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z"
                    />
                  </svg>
                  <input
                    className="w-full pl-12 pr-4 py-4 bg-brand-offwhite border border-brand-softgray rounded-2xl focus:border-brand-burnt focus:ring-2 focus:ring-brand-burnt/20 outline-none transition-all placeholder:text-gray-300 dark:bg-slate-900/50 dark:border-slate-800 dark:placeholder:text-slate-600 text-brand-charcoal dark:text-white font-medium"
                    id="lobby-name"
                    placeholder="e.g. Sunday Classics"
                    type="text"
                    value={playerData.lobbyName}
                    onChange={handleLobbyNameChange}
                    required
                  />
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                className="flex-1 px-8 py-4 bg-brand-charcoal text-white rounded-full font-semibold hover:bg-brand-burnt transition-all shadow-lg hover:shadow-brand-burnt/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isLoading}
              >
                <span>{isLoading ? 'Creating...' : 'Create Game'}</span>
                {!isLoading && (
                  <img src={arrowRight} alt="arrow-right" className="size-5" />
                )}
              </button>
              <button
                className="flex-1 px-8 py-4 bg-transparent border-2 border-brand-charcoal text-brand-charcoal rounded-full font-semibold hover:bg-brand-charcoal hover:text-white transition-all flex items-center justify-center gap-2 dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-brand-charcoal"
                type="button"
                onClick={() => navigate({ to: '/' })}
              >
                <span>Cancel</span>
              </button>
            </div>
          </form>
          {/* Additional Info */}
          <div className="mt-12 p-6 rounded-2xl bg-brand-burnt/5 border border-brand-burnt/10 flex items-start gap-4">
            <span className="material-symbols-outlined text-brand-burnt">
              info
            </span>
            <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">
              Lobbies are public by default (for now). Once created, your lobby will be public to everyone and accessible from the lobby list. When the lobby is full, it will disappear from the lobby list.
            </p>
          </div>
        </div>
      </main>

      {/* Decorative Background Elements */}
      <div className="fixed -bottom-24 -left-24 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed -top-24 -right-24 w-96 h-96 bg-brand-burnt/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
    </div>
  )
}

export default CreateForm
