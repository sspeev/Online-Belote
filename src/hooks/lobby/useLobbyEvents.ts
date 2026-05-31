// src/context/lobby/hooks/useLobbyEvents.ts
import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useSignalR } from '@/hooks/common/useSignalR'
import { usePlayer } from '@/hooks/player/usePlayer'
import type { Lobby } from '@/types/models/Lobby'
import type { Team } from '@/types/models/Team'

import type { LobbyAction } from '@/context/lobby/actions'

export const useLobbyEvents = (dispatch: React.Dispatch<LobbyAction>) => {
  const { signalRData, on, off, invoke } = useSignalR()
  const { playerData } = usePlayer()
  const navigate = useNavigate()

  const [roundCountdown, setRoundCountdown] = useState<number | null>(null)
  const [roundResultTeams, setRoundResultTeams] = useState<Team[] | null>(null)

  // Memoize handlers to prevent stale closures
  const onPlayerJoined = useCallback((lobby: Lobby) => {
    console.log('✅ EVENT RECEIVED: PlayerJoined', lobby)
    dispatch({ type: 'SET_LOBBY', lobby })
  }, [dispatch])

  const onPlayerLeft = useCallback((lobby: Lobby) => {
    console.log('✅ EVENT RECEIVED: PlayerLeft', lobby)
    dispatch({ type: 'SET_LOBBY', lobby })
  }, [dispatch])

  const onStartGame = useCallback(async (lobby: Lobby) => {
    console.log('✅ EVENT RECEIVED: StartGame', lobby)
    dispatch({ type: 'SET_LOBBY', lobby })
    await navigate({
      to: '/lobby/$lobbyId/game/gameboard',
      params: { lobbyId: lobby.id.toString() },
    })
  }, [dispatch, navigate])


  const onLobbyDeleted = useCallback((data: { LobbyId: number; Reason: string }) => {
    console.log('✅ EVENT RECEIVED: LobbyDeleted', data)
    window.location.href = '/'
  }, [])

  const onAfkDisconnected = useCallback(() => {
    console.warn('⏱️ EVENT RECEIVED: AfkDisconnected — kicked for inactivity')
    alert('You were disconnected for being AFK for too long.')
    window.location.href = '/'
  }, [])

  const onDealingCards = useCallback((
    lobby: Lobby,
    dealer: string,
    firstBidder: string,
  ) => {
    console.log('✅ EVENT RECEIVED:  CardsDealt', {
      lobby,
      dealer,
      firstBidder,
    })

    const firstBidderPlayer = lobby.game.sortedPlayers.find((p) => p.name === firstBidder)

    // Important: don't mutate the SignalR payload object.
    // Only apply a fallback if the backend didn't provide a currentPlayer.
    const lobbyUpdate: Lobby =
      !lobby.game.currentPlayer?.name?.trim() && firstBidderPlayer
        ? {
            ...lobby,
            game: {
              ...lobby.game,
              currentPlayer: firstBidderPlayer,
            },
          }
        : lobby

    dispatch({ type: 'SET_LOBBY', lobby: lobbyUpdate })

    setTimeout(() => {
      dispatch({ type: 'SET_GAME_PHASE', phase: 'bidding' })
    }, 1200)
  }, [dispatch])

  const onBidMade = useCallback((lobby: Lobby) => {
    console.log('✅ EVENT RECEIVED: BidMade', {
      nextPlayer: lobby.game.currentPlayer?.name,
      currentAnnounce: lobby.game.currentAnnounce,
      lobby,
    })
    dispatch({ type: 'SET_LOBBY', lobby: lobby })
  }, [dispatch])

  const onReset = useCallback((lobby: Lobby) => {
    dispatch({ type: 'SET_LOBBY', lobby: lobby })
    dispatch({ type: 'SET_GAME_PHASE', phase: 'splitting' })
  }, [dispatch])

  const onGamePlay = useCallback((lobby: Lobby) => {
    console.log('✅ EVENT RECEIVED: GamePlay', lobby)
    dispatch({ type: 'SET_LOBBY', lobby: lobby })
    dispatch({ type: 'SET_GAME_PHASE', phase: 'playing' })
  }, [dispatch])

  const onCardPlayed = useCallback((lobby: Lobby) => {
    console.log('✅ EVENT RECEIVED: CardPlayed', lobby)
    dispatch({ type: 'SET_LOBBY', lobby: lobby })

    if (lobby.gamePhase === 'scoring' || lobby.gamePhase === 'gameover') {
      const DISPLAY_SECONDS = 5

      setRoundResultTeams(lobby.game.teams)
      setRoundCountdown(DISPLAY_SECONDS)

      let remaining = DISPLAY_SECONDS - 1
      const interval = setInterval(() => {
        setRoundCountdown(remaining)
        if (remaining <= 0) {
          clearInterval(interval)
          setRoundResultTeams(null)
          setRoundCountdown(null)

          if (lobby.gamePhase === 'gameover') {
            // Game is fully complete — just update UI phase
            dispatch({ type: 'SET_GAME_PHASE', phase: 'gameover' })
          } else {
            // Kick off the next round: backend resets state and sets splitting phase
            // ONLY the host triggers ResetGame to prevent the queue rotating 4 times!
            if (playerData.player.hoster) {
              invoke('ResetGame', lobby.id).catch((err) =>
                console.error('❌ ResetGame invoke failed:', err),
              )
            }
          }
        }
        remaining -= 1
      }, 1000)
    }
  }, [dispatch, playerData, invoke])

  const onGameSkipped = useCallback((lobby: Lobby) => {
    console.log(
      '✅ EVENT RECEIVED: GameSkipped (no bid — round skipped)',
      lobby,
    )
    dispatch({ type: 'SET_LOBBY', lobby: lobby })
    dispatch({ type: 'SET_GAME_PHASE', phase: 'splitting' })
  }, [dispatch])

  useEffect(() => {
    if (signalRData.status !== 'connected') return

    on('PlayerJoined', onPlayerJoined)
    on('PlayerLeft', onPlayerLeft)
    on('GameStarted', onStartGame)
    on('LobbyDeleted', onLobbyDeleted)
    on('AfkDisconnected', onAfkDisconnected)

    on('CardsDealt', onDealingCards)
    on('BidMade', onBidMade)
    on('GameRestarted', onReset)
    on('GamePlay', onGamePlay)
    on('CardPlayed', onCardPlayed)
    on('GameSkipped', onGameSkipped)

    return () => {
      off('PlayerJoined', onPlayerJoined)
      off('PlayerLeft', onPlayerLeft)
      off('GameStarted', onStartGame)
      off('LobbyDeleted', onLobbyDeleted)
      off('AfkDisconnected', onAfkDisconnected)

      off('CardsDealt', onDealingCards)
      off('BidMade', onBidMade)
      off('GameRestarted', onReset)
      off('GamePlay', onGamePlay)
      off('CardPlayed', onCardPlayed)
      off('GameSkipped', onGameSkipped)
    }
  }, [signalRData.status, on, off, onPlayerJoined, onPlayerLeft, onStartGame, onLobbyDeleted, onAfkDisconnected, onDealingCards, onBidMade, onReset, onGamePlay, onCardPlayed, onGameSkipped])

  return {
    roundCountdown,
    roundResultTeams,
  }
}
