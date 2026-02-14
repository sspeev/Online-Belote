import { type ReactNode, useReducer, useRef, useCallback } from 'react'
import type * as signalR from '@microsoft/signalr'

import { SignalRContext, defaultSignalR } from './context'
import { signalRReducer } from './reducer'
import { buildConnection, start, stop } from '@/api/services/signalRService'

interface SignalRProviderProps {
  children: ReactNode
}

export const SignalRProvider = ({ children }: SignalRProviderProps) => {
  const [state, dispatch] = useReducer(signalRReducer, defaultSignalR)
  const connectionRef = useRef<signalR.HubConnection | null>(null)
  const handlersRef = useRef<Map<string, Set<(...args: any[]) => void>>>(
    new Map(),
  )

  const connect = useCallback(async (lobbyId: number) => {
    if (connectionRef.current) {
      await stop(connectionRef.current)
    }

    const connection = buildConnection(lobbyId)
    connectionRef.current = connection

    // Re-register all handlers
    handlersRef.current.forEach((callbacks, eventName) => {
      callbacks.forEach((callback) => {
        connection.on(eventName, callback)
      })
    })

    try {
      dispatch({ type: 'SET_STATUS', status: 'connecting' })
      await start(connection)
      dispatch({ type: 'SET_STATUS', status: 'connected' }) // ← This updates the SHARED state
      console.log('✅ SignalR connected')
    } catch (error) {
      dispatch({ type: 'SET_STATUS', status: 'disconnected' })
      console.error('❌ SignalR connection failed:', error)
      throw error
    }
  }, [])

  const on = useCallback(
    (eventName: string, callback: (...args: any[]) => void) => {
      console.log(`🎧 Registering: ${eventName}`)

      if (!handlersRef.current.has(eventName)) {
        handlersRef.current.set(eventName, new Set())
      }
      handlersRef.current.get(eventName)!.add(callback)

      if (connectionRef.current) {
        connectionRef.current.on(eventName, callback)
        console.log(`✅ Registered: ${eventName}`)
      }
    },
    [],
  )
  const invoke = useCallback(
    async <T = any,>(methodName: string, ...args: any[]): Promise<T> => {
      if (!connectionRef.current) {
        throw new Error('SignalR connection not established')
      }
      return await connectionRef.current.invoke<T>(methodName, ...args)
    },
    [],
  )

  // Unregister event listener
  const off = useCallback(
    (eventName: string, callback?: (...args: any[]) => void) => {
      // Remove from tracking
      if (callback) {
        handlersRef.current.get(eventName)?.delete(callback)
      } else {
        handlersRef.current.delete(eventName)
      }

      // Unregister from connection
      if (connectionRef.current) {
        if (callback) {
          connectionRef.current.off(eventName, callback)
        } else {
          connectionRef.current.off(eventName)
        }
      }
    },
    [],
  )

  const disconnect = useCallback(async () => {
    if (connectionRef.current) {
      await stop(connectionRef.current)
      connectionRef.current = null
      dispatch({ type: 'RESET' })
    }
  }, [])

  const value = {
    signalRData: state.signalRData, // ← This contains the status
    connect,
    disconnect,
    on,
    off,
    invoke,
    dispatchSignalR: dispatch,
  }

  return (
    <SignalRContext.Provider value={value}>{children}</SignalRContext.Provider>
  )
}
