// src/context/signalr/actions. ts
import * as signalR from '@microsoft/signalr'
import type { ConnectionStatus } from './types'

export type SignalRAction =
  | { type: 'SET_CONNECTION'; connection: signalR.HubConnection }
  | { type: 'SET_STATUS'; status: ConnectionStatus }
  | { type: 'SET_ERROR'; message: string | null }
  | { type: 'RESET' }