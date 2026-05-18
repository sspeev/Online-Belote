import { type ReactNode, useReducer } from 'react'
import { LobbyContext, defaultLobby } from './context'
import { lobbyReducer } from './reducer'
import { useLobbyEvents } from '@/hooks/lobby/useLobbyEvents'

export const LobbyProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(lobbyReducer, defaultLobby)
  const { roundCountdown, roundResultTeams } = useLobbyEvents(dispatch)

  const providerValue = {
    lobbyData: state.lobbyData,
    dispatchLobby: dispatch,
    roundCountdown,
    roundResultTeams
  }

  return (
    <LobbyContext.Provider value={providerValue}>
      {children}
    </LobbyContext.Provider>
  )
}
