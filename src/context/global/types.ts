// src/context/signalr/types.ts
import type { Dispatch } from 'react'
import type { SignalRAction } from './actions'
import type * as signalR from '@microsoft/signalr'

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'reconnecting'

export type SignalRState = {
  connection: signalR.HubConnection | null
  status: ConnectionStatus
  error: string | null
}

export type SignalRContextValue = {
  signalRData: SignalRState
  dispatchSignalR: Dispatch<SignalRAction>
  connect: (lobbyId: number) => Promise<void>
  disconnect: () => Promise<void>
  invoke: <T = any>(methodName: string, ...args: any[]) => Promise<T>
  on: (eventName: string, callback: (...args: any[]) => void) => void
  off: (eventName: string, callback?: (...args: any[]) => void) => void
}