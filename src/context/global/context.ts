// src/context/signalr/context.ts
import { createContext } from 'react'
import type { SignalRContextValue } from './types'

export const defaultSignalR: SignalRContextValue = {
  signalRData: {
    connection: null,
    status: 'disconnected',
    error: null,
  },
  dispatchSignalR: () => { },
  connect: async () => { },
  disconnect: async () => { },
  invoke: async () => {
    throw new Error('SignalR not initialized')
  },
  on: () => {
    throw new Error('SignalR not initialized')
  },
  off: () => {
    throw new Error('SignalR not initialized')
  },
}

export const SignalRContext = createContext<SignalRContextValue>(defaultSignalR)