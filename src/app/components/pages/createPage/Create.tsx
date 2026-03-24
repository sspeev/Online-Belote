import { useNavigate } from '@tanstack/react-router'
import * as React from 'react'
import { useState, type FC } from 'react'
import type { Player } from '@/types/models/Player'
import { usePlayer } from '@/hooks/usePlayer'
import { useSignalR } from '@/hooks/useSignalR.ts'
import { createLobby } from '@/api/services/LobbyService.ts'

//svgs
import arrowRight from '@/assets/svgs/Chevrons right.svg'
import user from '@/assets/svgs/user.svg'
import lobby from '@/assets/svgs/Lobby.svg'

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
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-brand-offwhite text-brand-charcoal dark:bg-[#221610] dark:text-slate-100 transition-colors duration-200">
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-26">
        <div className="w-full max-w-xl bg-white border border-[#e5e5e1] shadow-[0_4px_12px_rgba(45,45,45,0.08)] rounded-3xl p-8 md:p-12 dark:bg-brand-charcoal/30 dark:border-slate-800">
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
                  <img
                    src={user}
                    alt="user"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-burnt transition-colors size-7"
                  />
                  <input
                    className="w-full pl-12 pr-4 py-4 bg-brand-offwhite border border-brand-softgray rounded-2xl focus:border-brand-burnt focus:ring-0 transition-all placeholder:text-gray-300 dark:bg-slate-900/50 dark:border-slate-800 dark:placeholder:text-slate-600 text-brand-charcoal dark:text-white font-medium"
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
                  <img
                    src={lobby}
                    alt="lobby"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-burnt transition-colors size-7"
                  />
                  <input
                    className="w-full pl-12 pr-4 py-4 bg-brand-offwhite border border-brand-softgray rounded-2xl focus:border-brand-burnt focus:ring-0 transition-all placeholder:text-gray-300 dark:bg-slate-900/50 dark:border-slate-800 dark:placeholder:text-slate-600 text-brand-charcoal dark:text-white font-medium"
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
                className="flex-1 bg-brand-burnt hover:bg-brand-burnt/90 text-white font-bold py-5 px-8 rounded-2xl shadow-lg shadow-brand-burnt/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isLoading}
              >
                <span>{isLoading ? 'Creating...' : 'Create Game'}</span>
                {!isLoading && (
                  <img src={arrowRight} alt="arrow-right" className="size-5" />
                )}
              </button>
              <button
                className="flex-1 bg-white border border-brand-softgray hover:border-brand-charcoal text-brand-charcoal font-bold py-5 px-8 rounded-2xl transition-all flex items-center justify-center gap-2 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
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
              Lobbies are public by default (for now). Once created, your lobby wil be public to everyone and accessible from the lobby list. When the lobby is full, it will disappear from the lobby list.
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
