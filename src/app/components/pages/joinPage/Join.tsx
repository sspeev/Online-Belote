import * as React from 'react'

//route
import { useNavigate } from '@tanstack/react-router'

//hooks
import { useEffect, useCallback, useRef } from 'react'
import { usePlayer } from '@/hooks/player/usePlayer'
import { useSignalR } from '@/hooks/common/useSignalR'

//animation
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

//types
import type { Player } from '@/types/models/Player'
import type { Lobby } from '@/types/models/Lobby.ts'

// api
import { allLobbies } from '@/api/services/LobbyService.ts'
import { setCookie } from '@/api/session/endpoints'

//icons
import {
  ChevronsLeft,
  PlusCircle,
  RefreshCw,
  User,
  Ban,
  UserPlus,
} from 'lucide-react'

const JoinForm = () => {
  const navigate = useNavigate()
  const { playerData, dispatchPlayer } = usePlayer()
  const { invoke, connect } = useSignalR()

  const pageRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const playerCardRef = useRef<HTMLDivElement>(null)
  const lobbiesHeaderRef = useRef<HTMLDivElement>(null)
  const lobbyGridRef = useRef<HTMLDivElement>(null)
  const emptyStateRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const refreshIconRef = useRef<SVGSVGElement>(null)

  const refreshLobbies = useCallback(async () => {
    if (refreshIconRef.current) {
      gsap.to(refreshIconRef.current, {
        rotation: '+=360',
        duration: 0.6,
        ease: 'power2.inOut',
      })
    }

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

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (prefersReduced) return

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // 1. Header reveal
      if (headerRef.current) {
        tl.fromTo(
          headerRef.current,
          { y: -15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45 },
        )
      }

      // 2. Main content reveal
      const items = [
        playerCardRef.current,
        lobbiesHeaderRef.current,
        ctaRef.current,
      ].filter(Boolean)

      if (items.length > 0) {
        tl.fromTo(
          items,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.05,
            clearProps: 'all',
          },
          '-=0.25',
        )
      }
    },
    { scope: pageRef },
  )

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const isFull = card.getAttribute('data-full') === 'true'
    if (isFull) return

    gsap.to(card, {
      scale: 1.02,
      boxShadow: '0 8px 25px rgba(178, 91, 50, 0.12)',
      duration: 0.25,
      ease: 'power2.out',
    })

    // Subtle icon bounce
    const icon = card.querySelector('[data-purpose="lobby-icon"]')
    if (icon) {
      gsap.to(icon, {
        y: -2,
        duration: 0.2,
        ease: 'power2.out',
      })
    }
  }

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    gsap.to(card, {
      scale: 1,
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      duration: 0.25,
      ease: 'power2.out',
    })

    const icon = card.querySelector('[data-purpose="lobby-icon"]')
    if (icon) {
      gsap.to(icon, {
        y: 0,
        duration: 0.2,
        ease: 'power2.out',
      })
    }
  }

  const handlePlayerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedPlayer: Player = {
      ...playerData.player,
      name: e.target.value,
    }
    dispatchPlayer({ type: 'SET_PLAYER', payload: updatedPlayer })
  }

  const handleJoinLobby = async (lobby: Lobby) => {
    if (!lobby.id) return
    dispatchPlayer({ type: 'SET_LOBBY_NAME', payload: lobby.name })

    try {
      sessionStorage.setItem('playerName', playerData.player.name)
      await setCookie(playerData.player.name)

      if (!playerData.player.hoster) {
        await connect(lobby.id)
      }

      await invoke('JoinLobby', {
        playerName: playerData.player.name,
        lobbyId: lobby.id,
        lobbyName: playerData.lobbyName,
      })

      const updatedPlayer: Player = {
        ...playerData.player,
        lobbyId: lobby.id,
        hoster: false,
        status: 'Connected',
      }
      dispatchPlayer({ type: 'SET_PLAYER', payload: updatedPlayer })

      await navigate({
        to: '/lobby/$lobbyId/waiting',
        params: { lobbyId: lobby.id.toString() },
      })
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to join lobby'
      console.error(`Failed to join lobby: ${errorMessage}`)
      dispatchPlayer({ type: 'SET_ERROR', message: errorMessage })
    }
  }

  return (
    <main
      ref={pageRef}
      className="flex-1 flex flex-col items-center px-6 lg:px-40 py-28 w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen"
    >
      <div className="w-full max-w-4xl space-y-8">
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          style={{ opacity: 0 }}
        >
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
              <ChevronsLeft className="size-5" />
              <span>Back</span>
            </button>
            <button
              onClick={refreshLobbies}
              className="flex items-center gap-2 px-5 py-2.5 bg-transparent border-2 border-brand-charcoal text-brand-charcoal rounded-full font-semibold hover:bg-brand-charcoal hover:text-white transition-all cursor-pointer dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-brand-charcoal"
            >
              <RefreshCw ref={refreshIconRef} className="size-5" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        <div
          ref={playerCardRef}
          className="bg-white dark:bg-white/5 rounded-2xl p-8 border border-slate-100 dark:border-white/10 shadow-sm max-w-full"
          style={{ opacity: 0 }}
        >
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
          <div
            ref={lobbiesHeaderRef}
            className="flex items-center justify-between"
            style={{ opacity: 0 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Available Lobbies
            </h2>
            <span className="px-3 py-1 rounded-full bg-brand-burnt/10 text-brand-burnt text-xs font-bold uppercase tracking-widest">
              {playerData.availableLobbies.length} Active Tables
            </span>
          </div>

          {playerData.availableLobbies.length === 0 ? (
            <div
              ref={emptyStateRef}
              className="text-center py-10 bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/10 shadow-sm"
            >
              <p className="text-lg text-slate-500 dark:text-slate-400">
                No available lobbies at the moment. Try refreshing or create
                your own!
              </p>
            </div>
          ) : (
            <div
              ref={lobbyGridRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {playerData.availableLobbies.map((lobby: Lobby) => {
                const isFull = lobby.playerCount >= 4

                return (
                  <div
                    key={lobby.id}
                    data-full={isFull}
                    onMouseEnter={handleCardHover}
                    onMouseLeave={handleCardLeave}
                    className={`group bg-white dark:bg-white/5 p-5 rounded-2xl border border-slate-100 dark:border-white/10 ${isFull ? 'opacity-70' : 'hover:border-brand-burnt/50'} transition-all flex items-center justify-between`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        data-purpose="lobby-icon"
                        className="size-14 rounded-xl bg-brand-burnt/5 flex items-center justify-center text-brand-burnt"
                      >
                        {isFull ? (
                          <Ban className="size-5" />
                        ) : (
                          <UserPlus className="size-5" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-white group-hover:text-brand-burnt transition-colors">
                          {lobby.name || `Lobby ${lobby.id}`}
                        </h3>
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                          {isFull ? (
                            <Ban className="size-5" />
                          ) : (
                            <User className="size-5" />
                          )}
                          <span
                            className={isFull ? 'text-red-500 font-medium' : ''}
                          >
                            {isFull
                              ? 'Table Full'
                              : `${lobby.playerCount} / 4 Players`}
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
                      onClick={() => handleJoinLobby(lobby)}
                      disabled={isFull}
                      className={`px-6 py-2 rounded-full font-semibold transition-all flex items-center justify-center min-w-[90px] ${
                        isFull
                          ? 'bg-slate-200 dark:bg-white/5 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                          : 'bg-brand-charcoal text-white hover:bg-brand-burnt shadow-lg hover:shadow-brand-burnt/20 cursor-pointer'
                      }`}
                    >
                      Join
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          <div
            ref={ctaRef}
            className="pt-8 border-t border-slate-100 dark:border-white/10 flex justify-center"
            style={{ opacity: 0 }}
          >
            <button
              onClick={() => navigate({ to: '/create' })}
              className="flex items-center gap-3 px-8 py-4 bg-brand-charcoal text-white rounded-full font-semibold hover:bg-brand-burnt transition-all shadow-lg hover:shadow-brand-burnt/20 cursor-pointer"
            >
              <PlusCircle className="size-5" />
              <span className="font-bold tracking-wide">Create a Lobby</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default JoinForm
