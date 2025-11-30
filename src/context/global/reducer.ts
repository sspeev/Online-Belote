// src/context/signalr/reducer.ts
import type { SignalRAction } from './actions'
import type { SignalRContextValue } from './types'
import { defaultSignalR } from './context'

export const signalRReducer = (
  state: SignalRContextValue,
  action: SignalRAction,
): SignalRContextValue => {
  switch (action.type) {
    case 'SET_CONNECTION':
      return {
        ...state,
        signalRData: {
          ... state.signalRData,
          connection: action.connection,
        },
      }
    case 'SET_STATUS':
      return {
        ...state,
        signalRData: {
          ...state.signalRData,
          status: action.status,
        },
      }
    case 'SET_ERROR':
      return {
        ...state,
        signalRData: {
          ...state.signalRData,
          error: action.message,
        },
      }
    case 'RESET':
      return { ...defaultSignalR }
    default:
      return state
  }
}