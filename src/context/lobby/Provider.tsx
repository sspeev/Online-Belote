import { type ReactNode, useReducer, useEffect } from 'react'
import { LobbyContext, defaultLobby } from './context'
import { lobbyReducer } from './reducer'
import { useLobbyEvents } from '@/hooks/lobby/useLobbyEvents'
import type { LobbyContextValue } from './types'
import type { LobbyAction } from './actions'

// Module-level state that survives provider remounts (e.g. TanStack Router
// navigation teardown). Updated synchronously inside the reducer so it is
// always current before React unmounts the old tree.
let _persisted: LobbyContextValue | null = null

const persistingReducer = (
  state: LobbyContextValue,
  action: LobbyAction,
): LobbyContextValue => {
  const next = lobbyReducer(state, action)
  _persisted = next
  return next
}

export const LobbyProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    persistingReducer,
    _persisted ?? defaultLobby,
  )
  const { roundCountdown, roundResultTeams } = useLobbyEvents(dispatch)

  useEffect(() => {
    console.log('🟢 LobbyProvider MOUNTED')
    return () => console.log('🔴 LobbyProvider UNMOUNTING')
  }, [])

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
