import { describe, it, expect } from 'vitest'
import { signalRReducer } from '@/context/global/reducer'
import { defaultSignalR } from '@/context/global/context'
import type { SignalRContextValue } from '@/context/global/types'

describe('signalRReducer', () => {
  it('should handle SET_STATUS', () => {
    const initialState: SignalRContextValue = { ...defaultSignalR }
    
    const newState = signalRReducer(initialState, { 
      type: 'SET_STATUS', 
      status: 'connected'
    })
    
    expect(newState.signalRData.status).toBe('connected')
  })

  it('should handle RESET', () => {
    const initialState: SignalRContextValue = {
      ...defaultSignalR,
      signalRData: {
        ...defaultSignalR.signalRData,
        status: 'connected',
        error: 'Some error'
      }
    }
    
    const newState = signalRReducer(initialState, { type: 'RESET' })
    
    expect(newState.signalRData.status).toBe('disconnected')
    expect(newState.signalRData.error).toBeNull()
  })
})
