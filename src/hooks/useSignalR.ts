import { useCallback } from 'react'
import { useRef, useState } from 'react'
import { buildConnection, start, stop } from '@/api/services/signalRService.ts'
import * as signalR from '@microsoft/signalr'

export const useSignalR = () => {
  const connectionRef = useRef<signalR.HubConnection | null>(null)
  const [status, setStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected')

  const connect = useCallback(async (lobbyId: number) => {
    if (connectionRef.current) {
      await stop(connectionRef.current)
    }

    setStatus('connecting')
    const connection = buildConnection(lobbyId)
    connectionRef.current = connection

    try {
      await start(connection)
      console.log('✅ SignalR connected')
      setStatus('connected')
    } catch (err) {
      console.error('❌ SignalR connection failed:', err)
      setStatus('disconnected')
      throw err
    }
  }, [])

  const disconnect = useCallback(async () => {
    if (connectionRef.current) {
      try {
        await stop(connectionRef.current)
        console.log('🛑 SignalR disconnected')
      } catch (err) {
        console.error('Error disconnecting:', err)
      }
      connectionRef.current = null
      setStatus('disconnected')
    }
  }, [])

  const on = useCallback((eventName: string, callback: (...args: any[]) => void) => {
    if (connectionRef.current) {
      connectionRef.current.on(eventName, callback)
    }
  }, [])

  const off = useCallback((eventName: string, callback?: (...args: any[]) => void) => {
    if (connectionRef.current) {
      if (callback) {
        connectionRef.current.off(eventName, callback)
      } else {
        connectionRef.current.off(eventName)
      }
    }
  }, [])

  const invoke = useCallback(async (methodName: string, ...args: any[]) => {
    if (connectionRef.current && status === 'connected') {
      return await connectionRef.current.invoke(methodName, ...args)
    }
    throw new Error('SignalR connection not ready')
  }, [status])

  return {
    signalRData: { status },
    connect,
    disconnect,
    on,
    off,
    invoke
  }
}
