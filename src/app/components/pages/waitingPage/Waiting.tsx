// hooks
import { useLobby } from '@/hooks/lobby/useLobby'
import { usePlayer } from '@/hooks/player/usePlayer'
import { useSignalR } from '@/hooks/common/useSignalR'
import { useLobbyRejoin } from '@/hooks/lobby/useLobbyRejoin'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'

//animation
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// types
import type { Player } from '@/types/models/Player.ts'

// api
import { findLobby } from '@/api/services/LobbyService.ts'

// components
import PlayerBox from '@/app/components/pages/waitingPage/components/PlayerBox'

//icons
import { UserPlus, PlayCircle } from 'lucide-react'

const Waiting = () => {
  const navigate = useNavigate()
  const { lobbyId } = useParams({ from: '/lobby/$lobbyId/waiting' })
  const { lobbyData, dispatchLobby } = useLobby()
  const { playerData, dispatchPlayer } = usePlayer()
  const { invoke, on, off } = useSignalR()

  const pageRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)

  useLobbyRejoin()

  const connectedPlayers: Player[] = useMemo(
    () => lobbyData.lobby.connectedPlayers.filter(Boolean),
    [lobbyData.lobby.connectedPlayers],
  )

  const loadLobbyData = useCallback(async () => {
    try {
      await findLobby(dispatchLobby, Number(lobbyId))
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to load lobby'
      console.error('Failed to load lobby:', errorMessage)
    }
  }, [dispatchLobby, lobbyId])

  useEffect(() => {
    if (playerData.player.lobbyId !== Number(lobbyId)) {
      dispatchPlayer({
        type: 'SET_PLAYER',
        payload: {
          ...playerData.player,
          lobbyId: Number(lobbyId),
        },
      })
    }
  }, [lobbyId, playerData.player, dispatchPlayer])

  useEffect(() => {
    // Fetch the initial lobby data when the component mounts
    loadLobbyData()

    // Set up the SignalR event listeners for real-time updates
    on('PlayerJoined', loadLobbyData)
    on('PlayerLeft', loadLobbyData)
    on('LobbyUpdated', loadLobbyData)

    // Clean up the event listeners when the component unmounts
    return () => {
      off('PlayerJoined', loadLobbyData)
      off('PlayerLeft', loadLobbyData)
      off('LobbyUpdated', loadLobbyData)
    }
  }, [on, off, loadLobbyData])

  const handleLeaveLobby = async () => {
    try {
      await invoke('LeaveLobby', {
        playerName: playerData.player.name,
        lobbyId: lobbyData.lobby.id,
      })

      await navigate({
        to: '/',
      })
      dispatchPlayer({ type: 'RESET' })
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to leave lobby'
      console.error('Failed to leave lobby:', errorMessage)
      dispatchPlayer({ type: 'SET_ERROR', message: errorMessage })
    }
  }

  const handleStartGame = async () => {
    try {
      await invoke('StartGame', lobbyData.lobby.id)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to start game:'
      console.error('Failed to start game:', error)
      dispatchPlayer({ type: 'SET_ERROR', message: errorMessage })
    }
  }

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      if (prefersReduced) return

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 0.5 },
        delay: 0.1,
      })

      // 1. Header reveal
      if (headerRef.current) {
        tl.fromTo(
          headerRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1 },
        )
      }

      // 3. Actions slide up
      if (actionsRef.current) {
        tl.fromTo(
          actionsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, ease: 'back.out(1.2)' },
          '-=0.2',
        )
      }
    },
    { scope: pageRef },
  )

  // Dynamic player grid reveal
  useGSAP(
    () => {
      if (!gridRef.current) return
      gsap.fromTo(
        gridRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          clearProps: 'all',
          ease: 'power3.out',
        },
      )
    },
    { scope: pageRef, dependencies: [connectedPlayers.length] },
  )

  // Floating idle for empty slots
  useGSAP(
    () => {
      if (!gridRef.current) return
      const emptySlots = gridRef.current.querySelectorAll(
        '[data-purpose="empty-slot"]',
      )
      if (emptySlots.length === 0) return

      gsap.to(emptySlots, {
        y: -4,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.2,
          repeat: -1,
          yoyo: true,
        },
      })
    },
    { scope: pageRef, dependencies: [connectedPlayers.length] },
  )

  return (
    <div
      ref={pageRef}
      className="bg-background-light dark:bg-background-dark text-charcoal dark:text-slate-100 min-h-screen relative flex h-auto w-full flex-col overflow-x-hidden"
    >
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-24 flex flex-col gap-12">
        {/* Lobby Status Header */}
        <div
          ref={headerRef}
          className="flex flex-col gap-4 text-center md:text-left"
          style={{ opacity: 0 }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-charcoal dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-tight">
                {lobbyData.lobby.name}
              </h1>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-800/50 border border-brand-burnt/20 px-5 py-2.5 rounded-full self-start md:self-auto">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-burnt opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-burnt"></span>
              </span>
              <p className="text-charcoal dark:text-slate-200 text-sm font-medium">
                {lobbyData.lobby.gamePhase === 'bidding'
                  ? 'Live'
                  : 'Waiting for players'}{' '}
                ({lobbyData.lobby.playerCount}/4)
              </p>
            </div>
          </div>
        </div>

        {/* Players Section */}
        <section
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          style={{ opacity: 0 }}
        >
          {/* Connected Players */}
          {connectedPlayers.map((player: Player) => (
            <PlayerBox key={player.name} player={player} />
          ))}

          {/* Empty Slots */}
          {Array.from({ length: 4 - connectedPlayers.length }).map((_, i) => (
            <div
              key={`empty-${i}`}
              data-purpose="empty-slot"
              className="flex items-center justify-between p-6 bg-slate-50/50 dark:bg-slate-800/30 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center gap-5">
                <div className="flex items-center justify-center aspect-square bg-slate-100 dark:bg-slate-700/50 rounded-xl h-16 w-16">
                  <UserPlus className="text-slate-400 size-8" />
                </div>
                <div className="flex flex-col">
                  <p className="text-slate-400 dark:text-slate-500 text-lg font-medium italic">
                    Waiting...
                  </p>
                  <span className="text-slate-300 dark:text-slate-600 text-xs font-semibold uppercase tracking-tighter">
                    Open Slot
                  </span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Action Buttons */}
        <div
          ref={actionsRef}
          className="flex flex-col gap-4 mt-8"
          style={{ opacity: 0 }}
        >
          {playerData.player.hoster && (
            <button
              onClick={handleStartGame}
              disabled={lobbyData.lobby.playerCount < 4}
              className={`w-full py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 border-2 transition-all duration-300 ${
                lobbyData.lobby.playerCount < 4
                  ? 'bg-brand-burnt/20 text-brand-burnt opacity-50 cursor-not-allowed border-brand-burnt/10'
                  : 'bg-brand-burnt text-white border-brand-burnt hover:bg-brand-burnt/90 shadow-lg'
              }`}
            >
              <PlayCircle className="size-6" />
              Start Game
            </button>
          )}
          <button
            onClick={handleLeaveLobby}
            className="w-full py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-charcoal dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            Leave Lobby
          </button>
          <p className="text-center text-slate-400 text-sm mt-2">
            The host will start the game once all 4 seats are filled.
          </p>
        </div>
      </main>
    </div>
  )
}

export default Waiting
