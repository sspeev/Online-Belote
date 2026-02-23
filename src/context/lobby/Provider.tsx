import { type ReactNode, useEffect, useReducer } from 'react'
import { LobbyContext, defaultLobby } from './context'
import { lobbyReducer } from './reducer'
import { useSignalR } from '@/hooks/useSignalR'
import type { Lobby } from '@/types/models/Lobby'
import { useNavigate } from '@tanstack/react-router'

export const LobbyProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(lobbyReducer, defaultLobby)
  const { signalRData, on, off } = useSignalR()
  const navigate = useNavigate()

  useEffect(() => {
    if (signalRData.status !== 'connected') return

    const onPlayerJoined = (lobby: Lobby) => {
      console.log('✅ EVENT RECEIVED: PlayerJoined', lobby)
      dispatch({ type: 'SET_LOBBY', lobby: lobby })
    }

    const onPlayerLeft = (lobby: Lobby) => {
      console.log('✅ EVENT RECEIVED: PlayerLeft', lobby)
      dispatch({ type: 'SET_LOBBY', lobby: lobby })
    }

    const onStartGame = async (lobby: Lobby) => {
      console.log('✅ EVENT RECEIVED: StartGame', lobby)
      dispatch({ type: 'SET_LOBBY', lobby: lobby })
      await navigate({
        to: '/lobby/$lobbyId/game/gameboard',
        params: { lobbyId: lobby.id.toString() },
      })
    }

    const onLobbyDeleted = (data: { LobbyId: number; Reason: string }) => {
      console.log('✅ EVENT RECEIVED: LobbyDeleted', data)
      window.location.href = '/'
    }

    on('PlayerJoined', onPlayerJoined)
    on('PlayerLeft', onPlayerLeft)
    on('GameStarted', onStartGame)
    on('LobbyDeleted', onLobbyDeleted)

    return () => {
      off('PlayerJoined', onPlayerJoined)
      off('PlayerLeft', onPlayerLeft)
      off('GameStarted', onStartGame)
      off('LobbyDeleted', onLobbyDeleted)
    }
  }, [signalRData.status, on, off])

  //Register game event handlers
  useEffect(() => {
    if (signalRData.status !== 'connected') return

    const onDealingCards = (
      lobby: Lobby,
      dealer: string,
      firstBidder: string,
    ) => {
      console.log('✅ EVENT RECEIVED:  CardsDealt', {
        lobby,
        dealer,
        firstBidder,
      })

      const firstBidderPlayer = lobby.game.sortedPlayers.find(
        (p) => p.name === firstBidder,
      )

      if (firstBidderPlayer) {
        lobby.game.currentPlayer = firstBidderPlayer
      }

      dispatch({ type: 'SET_LOBBY', lobby: lobby })

      setTimeout(() => {
        dispatch({ type: 'SET_GAME_PHASE', phase: 'bidding' })
      }, 1200)
    }

    const onBidMade = (lobby: Lobby) => {
      console.log('✅ EVENT RECEIVED: BidMade', {
        nextPlayer: lobby.game.currentPlayer.name,
        currentAnnounce: lobby.game.currentAnnounce,
        lobby,
      })
      dispatch({ type: 'SET_LOBBY', lobby: lobby })
      dispatch({ type: 'UPDATE_GAME', game: lobby.game })
    }

    const onReset = (lobby: Lobby) => {
      console.log('✅ EVENT RECEIVED: ResetGame', lobby)
      dispatch({ type: 'SET_LOBBY', lobby: lobby })
      dispatch({ type: 'UPDATE_GAME', game: lobby.game })
      dispatch({ type: 'SET_GAME_PHASE', phase: 'splitting' })
    }

    const onGamePlay = (lobby: Lobby) => {
      console.log('✅ EVENT RECEIVED: GamePlay', lobby)
      dispatch({ type: 'SET_LOBBY', lobby: lobby })
      dispatch({ type: 'UPDATE_GAME', game: lobby.game })
      dispatch({ type: 'SET_GAME_PHASE', phase: 'playing' })
    }

    const onCardPlayed = (lobby: Lobby) => {
      console.log('✅ EVENT RECEIVED: CardPlayed', lobby)
      dispatch({ type: 'SET_LOBBY', lobby: lobby })
      dispatch({ type: 'UPDATE_GAME', game: lobby.game })
    }

    on('CardsDealt', onDealingCards)
    on('BidMade', onBidMade)
    on('GameRestarted', onReset)
    on('GamePlay', onGamePlay)
    on('CardPlayed', onCardPlayed)

    return () => {
      off('CardsDealt', onDealingCards)
      off('BidMade', onBidMade)
      off('GameRestarted', onReset)
      off('GamePlay', onGamePlay)
      off('CardPlayed', onCardPlayed)
    }
  }, [signalRData.status, on, off])

  const providerValue = {
    lobbyData: state.lobbyData,
    dispatchLobby: dispatch,
  }

  return (
    <LobbyContext.Provider value={providerValue}>
      {children}
    </LobbyContext.Provider>
  )
}
