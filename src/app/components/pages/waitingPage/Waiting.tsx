// hooks
import { useLobby } from '@/hooks/useLobby.ts'
import { usePlayer } from '@/hooks/usePlayer.ts'
import { useSignalR } from '@/hooks/useSignalR'
import { useCallback, useEffect, useMemo } from 'react'
import { useNavigate } from '@tanstack/react-router'

// components
import PlayerBox from '@/app/components/pages/waitingPage/components/PlayerBox'

// types
import type { Player } from '@/types/models/Player.ts'

// api
import { findLobby } from '@/api/services/LobbyService.ts'

//icons
import { UserPlus, PlayCircle } from 'lucide-react'

const Waiting = () => {
  const { lobbyData, dispatchLobby } = useLobby()

  const { playerData, dispatchPlayer } = usePlayer()
  const navigate = useNavigate()
  const { invoke, on, off } = useSignalR()

  const connectedPlayers = useMemo(
    () =>
      lobbyData.lobby.connectedPlayers.filter(
        (player: Player | null | undefined) =>
          player !== null && player !== undefined,
      ),
    [lobbyData.lobby.connectedPlayers],
  )

  const loadLobbyData = useCallback(async () => {
    try {
      await findLobby(dispatchLobby, playerData)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to load lobby'
      console.error('Failed to load lobby:', errorMessage)
    }
  }, [dispatchLobby, playerData])

  useEffect(() => {
    loadLobbyData()
  }, [loadLobbyData])

  useEffect(() => {
    const handleLobbyUpdate = () => {
      console.log('🔄 Reloading lobby data due to SignalR event')
      loadLobbyData()
    }

    on('PlayerJoined', handleLobbyUpdate)
    on('PlayerLeft', handleLobbyUpdate)
    on('LobbyUpdated', handleLobbyUpdate)

    return () => {
      off('PlayerJoined', handleLobbyUpdate)
      off('PlayerLeft', handleLobbyUpdate)
      off('LobbyUpdated', handleLobbyUpdate)
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
      console.error('Failed to start game:', error)
    }
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-charcoal dark:text-slate-100 min-h-screen relative flex h-auto w-full flex-col overflow-x-hidden">
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-24 flex flex-col gap-12">
        {/* Lobby Status Header */}
        <div className="flex flex-col gap-4 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-charcoal dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-tight">
                {lobbyData.lobby.name}
              </h1>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-slate-800/50 border border-primary/20 px-5 py-2.5 rounded-full self-start md:self-auto">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
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
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Connected Players */}
          {connectedPlayers.map((player: Player) => (
            <PlayerBox key={player.name} player={player} />
          ))}

          {/* Empty Slots */}
          {Array.from({ length: 4 - connectedPlayers.length }).map((_, i) => (
            <div
              key={`empty-${i}`}
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
        <div className="flex flex-col gap-4 mt-8">
          {playerData.player.hoster && (
            <button
              onClick={handleStartGame}
              disabled={lobbyData.lobby.playerCount < 4}
              className={`w-full py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 border-2 transition-all duration-300 ${
                lobbyData.lobby.playerCount < 4
                  ? 'bg-primary/20 text-primary opacity-50 cursor-not-allowed border-primary/10'
                  : 'bg-primary text-white border-primary hover:bg-primary/90 shadow-lg'
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
            The host has to start the game when the lobby is full
          </p>
        </div>
      </main>
    </div>
  )
}

export default Waiting
