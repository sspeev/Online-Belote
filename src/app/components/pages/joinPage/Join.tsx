import * as React from 'react'
import { useEffect, useCallback, useState, type FC } from 'react'

//hooks
import { usePlayer } from '@/hooks/usePlayer'
import { useNavigate } from '@tanstack/react-router'
import { useSignalR } from '@/hooks/useSignalR.ts'

//types
import type { Player } from '@/types/models/Player'
import type { Lobby } from '@/types/models/Lobby.ts'

// api
import { allLobbies } from '@/api/services/LobbyService.ts'

// components
import { Spinner } from '../../common/Spinner'

//svgs
import arrowLeft from '@/assets/svgs/Chevrons left.svg'
import addCircle from '@/assets/svgs/AddCircle.svg'
import refresh from '@/assets/svgs/Refresh.svg'
import user from '@/assets/svgs/user.svg'
import block from '@/assets/svgs/Block.svg'
import groupAdd from '@/assets/svgs/GroupAdd.svg'

const JoinForm: FC = () => {
  const { playerData, dispatchPlayer } = usePlayer()
  const navigate = useNavigate()
  const { invoke, connect } = useSignalR()
  const [isJoiningLobbyId, setIsJoiningLobbyId] = useState<number | null>(null)

  const handlePlayerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedPlayer: Player = {
      ...playerData.player,
      name: e.target.value,
    }
    dispatchPlayer({ type: 'SET_PLAYER', payload: updatedPlayer })
  }

  const handleSelectedLobbyIdChange = (lobbyId: number) => {
    dispatchPlayer({ type: 'SET_SELECTED_LOBBY_ID', payload: lobbyId })
  }

  const handleJoinLobby = async (lobbyId: number) => {
    if (isJoiningLobbyId !== null || !lobbyId) return
    setIsJoiningLobbyId(lobbyId)
    handleSelectedLobbyIdChange(lobbyId)

    try {
      if (!playerData.player.hoster) {
        await connect(lobbyId)
      }
      await invoke('JoinLobby', {
        playerName: playerData.player.name,
        lobbyId: lobbyId,
        lobbyName: playerData.lobbyName,
      })

      const updatedPlayer: Player = {
        ...playerData.player,
        lobbyId: lobbyId,
        hoster: false,
        status: 'Connected',
      }
      dispatchPlayer({ type: 'SET_PLAYER', payload: updatedPlayer })

      await navigate({
        to: '/lobby/$lobbyId/waiting',
        params: { lobbyId: lobbyId.toString() },
      })
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to join lobby'
      console.error(`Failed to join lobby: ${errorMessage}`)
      dispatchPlayer({ type: 'SET_ERROR', message: errorMessage })
    } finally {
      setIsJoiningLobbyId(null)
    }
  }

  const refreshLobbies = useCallback(async () => {
    try {
      await allLobbies(dispatchPlayer)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to refresh lobbies'
      console.error('Failed to refresh lobbies:', errorMessage)
    }
  }, [dispatchPlayer])

  useEffect(() => {
    refreshLobbies()
  }, [refreshLobbies])

  return (
    <main className="flex-1 flex flex-col items-center px-6 lg:px-40 py-26 w-full mb-16 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
      <div className="w-full max-w-4xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Join Lobby
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-md">
              Find an open lobby to start your next match.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate({ to: '/' })}
              className="flex items-center gap-2 px-5 py-2.5 bg-transparent border-2 border-brand-charcoal text-brand-charcoal rounded-full font-semibold hover:bg-brand-charcoal hover:text-white transition-all cursor-pointer dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-brand-charcoal"
            >
              <img src={arrowLeft} alt="arrow-left" className="size-5" />
              <span>Back</span>
            </button>
            <button
              onClick={refreshLobbies}
              className="flex items-center gap-2 px-5 py-2.5 bg-transparent border-2 border-brand-charcoal text-brand-charcoal rounded-full font-semibold hover:bg-brand-charcoal hover:text-white transition-all cursor-pointer dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-brand-charcoal"
            >
              <img src={refresh} alt="refresh" className="size-5" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-white/5 rounded-2xl p-8 border border-slate-100 dark:border-white/10 shadow-sm max-w-full">
          <div className="group">
            <label className="block space-y-3">
              <span className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Player Name
              </span>
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
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 focus:ring-2 focus:ring-brand-burnt/20 focus:border-brand-burnt transition-all text-lg font-medium outline-none text-brand-charcoal dark:text-white"
                  placeholder="What's your nickname?"
                  type="text"
                  value={playerData.player.name}
                  onChange={handlePlayerNameChange}
                />
              </div>
            </label>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Available Lobbies
            </h2>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
              {playerData.availableLobbies.length} Active Tables
            </span>
          </div>

          {playerData.availableLobbies.length === 0 ? (
            <div className="text-center py-10 bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/10 shadow-sm">
              <p className="text-lg text-slate-500 dark:text-slate-400">
                No available lobbies at the moment. Try refreshing or create your own!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {playerData.availableLobbies.map((lobby: Lobby) => {
                const isFull = lobby.playerCount >= 4
                const joiningThis = isJoiningLobbyId === lobby.id

                return (
                  <div
                    key={lobby.id}
                    className={`group bg-white dark:bg-white/5 p-5 rounded-2xl border border-slate-100 dark:border-white/10 ${isFull ? 'opacity-70' : 'hover:border-primary/50'} transition-all flex items-center justify-between`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-14 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                        <img src={isFull ? block : groupAdd} alt={isFull ? 'block' : 'user'} className="size-5" />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-white group-hover:text-primary transition-colors">
                          {lobby.name || `Lobby ${lobby.id}`}
                        </h3>
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                          {isFull ? (
                            <img src={block} alt="block" className="size-5" />
                          ) : (
                            <img src={user} alt="user" className="size-5" />
                          )}
                          <span className={isFull ? 'text-red-500 font-medium' : ''}>
                            {isFull ? 'Table Full' : `${lobby.playerCount} / 4 Players`}
                          </span>
                        </div>
                        {lobby.gamePhase !== 'waiting' && (
                          <div className="text-xs text-slate-400 mt-1">
                            Status: {lobby.gamePhase}
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleJoinLobby(lobby.id)}
                      disabled={isJoiningLobbyId !== null || isFull}
                      className={`px-6 py-2 rounded-full font-semibold transition-all flex items-center justify-center min-w-[90px] ${
                        isFull
                          ? 'bg-slate-200 dark:bg-white/5 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                          : 'bg-brand-charcoal text-white hover:bg-brand-burnt shadow-lg hover:shadow-brand-burnt/20 cursor-pointer'
                      }`}
                    >
                      {joiningThis ? (
                        <Spinner className="w-5 h-5 text-white" />
                      ) : isFull ? (
                        'Full'
                      ) : (
                        'Join'
                      )}
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          <div className="pt-8 border-t border-slate-100 dark:border-white/10 flex justify-center">
            <button
              onClick={() => navigate({ to: '/create' })}
              className="flex items-center gap-3 px-8 py-4 bg-brand-charcoal text-white rounded-full font-semibold hover:bg-brand-burnt transition-all shadow-lg hover:shadow-brand-burnt/20 cursor-pointer"
            >
              <img src={addCircle} alt="add-circle" className="size-5" />
              <span className="font-bold tracking-wide">
                Create a Lobby
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default JoinForm
