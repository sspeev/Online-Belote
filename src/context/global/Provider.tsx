// src/context/signalr/Provider.tsx
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
  const handlersRef = useRef<Map<string, Set<(... args: any[]) => void>>>(new Map())

  // Invoke server method
  const invoke = useCallback(
    async <T = any>(methodName: string, ...args: any[]): Promise<T> => {
      if (!connectionRef.current) {
        throw new Error('SignalR connection not established')
      }
      return await connectionRef.current. invoke<T>(methodName, ...args)
    },
    []
  )

  // Register event listener
  const on = useCallback((eventName: string, callback: (...args: any[]) => void) => {

    if (!handlersRef.current.has(eventName)) {
      handlersRef.current.set(eventName, new Set())
    }
    handlersRef.current. get(eventName)!.add(callback)

    // Register with connection if it exists
    if (connectionRef. current) {
      connectionRef. current.on(eventName, callback)
    }
  }, [])

  // Unregister event listener
  const off = useCallback((eventName: string, callback?: (...args: any[]) => void) => {
    // Remove from tracking
    if (callback) {
      handlersRef. current.get(eventName)?. delete(callback)
    } else {
      handlersRef. current.delete(eventName)
    }

    // Unregister from connection
    if (connectionRef.current) {
      connectionRef.current.off(eventName)
    }
  }, [])

  const connect = useCallback(async (lobbyId: number) => {
    if (connectionRef.current) {
      await stop(connectionRef.current)
    }

    const connection = buildConnection(lobbyId)
    connectionRef.current = connection

    connection.onreconnecting((error) => {
      console.log('🔄 SignalR reconnecting...', error)
      dispatch({ type: 'SET_STATUS', status: 'reconnecting' })
    })

    connection.onreconnected(() => {
      console.log('✅ SignalR reconnected')
      dispatch({ type: 'SET_STATUS', status: 'connected' })
      dispatch({ type: 'SET_ERROR', message: null })

      handlersRef.current.forEach((handlers, eventName) => {
        handlers.forEach((handler) => {
          connection.on(eventName, handler)
        })
      })
    })

    connection.onclose((error) => {
      console.log('❌ SignalR connection closed', error)
      dispatch({ type: 'SET_STATUS', status: 'disconnected' })
      if (error) {
        dispatch({ type: 'SET_ERROR', message: error.message })
      }
    })

    try {
      dispatch({ type: 'SET_STATUS', status: 'connecting' })
      await start(connection)
      dispatch({ type: 'SET_CONNECTION', connection })
      dispatch({ type: 'SET_STATUS', status: 'connected' })
      console.log('✅ SignalR connected')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Connection failed'
      dispatch({ type: 'SET_ERROR', message: errorMessage })
      dispatch({ type: 'SET_STATUS', status: 'disconnected' })
      console.error('❌ SignalR connection error:', error)
      throw error
    }
  }, [])

  const disconnect = useCallback(async () => {
    if (connectionRef.current) {
      await stop(connectionRef.current)
      connectionRef.current = null
      dispatch({ type: 'RESET' })
    }
  }, [])


  const providerValue = {
    signalRData: state.signalRData,
    dispatchSignalR: dispatch,
    invoke,
    connect,
    disconnect,
    on,
    off,
  }

  return <SignalRContext.Provider value={providerValue}>{children}</SignalRContext.Provider>
}