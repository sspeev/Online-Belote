import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { SignalRProvider } from '@/context/global/Provider'
import { useContext } from 'react'
import { SignalRContext } from '@/context/global/context'
import * as signalRService from '@/api/services/signalRService'
import type * as signalR from '@microsoft/signalr'

vi.mock('@/api/services/signalRService', () => ({
  buildConnection: vi.fn(),
  start: vi.fn(),
  stop: vi.fn(),
}))

describe('SignalRProvider', () => {
  let mockConnection: any

  beforeEach(() => {
    vi.clearAllMocks()

    // Mock HubConnection behavior
    mockConnection = {
      on: vi.fn(),
      off: vi.fn(),
      invoke: vi.fn().mockResolvedValue('invoked'),
      start: vi.fn(),
      stop: vi.fn(),
      state: 'Connected',
    }

    vi.mocked(signalRService.buildConnection).mockReturnValue(mockConnection as unknown as signalR.HubConnection)
    vi.mocked(signalRService.start).mockResolvedValue()
    vi.mocked(signalRService.stop).mockResolvedValue()
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SignalRProvider>{children}</SignalRProvider>
  )

  it('connects to SignalR and updates status', async () => {
    const { result } = renderHook(() => useContext(SignalRContext), { wrapper })

    expect(result.current.signalRData.status).toBe('disconnected')

    await act(async () => {
      await result.current.connect(123)
    })

    expect(signalRService.buildConnection).toHaveBeenCalledWith(123)
    expect(signalRService.start).toHaveBeenCalledWith(mockConnection)
    expect(result.current.signalRData.status).toBe('connected')
  })

  it('registers and unregisters events (on/off)', async () => {
    const { result } = renderHook(() => useContext(SignalRContext), { wrapper })

    await act(async () => {
      await result.current.connect(123)
    })

    const callback = vi.fn()

    act(() => {
      result.current.on('TestEvent', callback)
    })

    expect(mockConnection.on).toHaveBeenCalledWith('TestEvent', callback)

    act(() => {
      result.current.off('TestEvent', callback)
    })

    expect(mockConnection.off).toHaveBeenCalledWith('TestEvent', callback)
  })

  it('invokes events', async () => {
    const { result } = renderHook(() => useContext(SignalRContext), { wrapper })

    await act(async () => {
      await result.current.connect(123)
    })

    let response: any
    await act(async () => {
      response = await result.current.invoke('TestMethod', 'arg1', 'arg2')
    })

    expect(mockConnection.invoke).toHaveBeenCalledWith('TestMethod', 'arg1', 'arg2')
    expect(response).toBe('invoked')
  })

  it('disconnects and resets state', async () => {
    const { result } = renderHook(() => useContext(SignalRContext), { wrapper })

    await act(async () => {
      await result.current.connect(123)
    })

    expect(result.current.signalRData.status).toBe('connected')

    await act(async () => {
      await result.current.disconnect()
    })

    expect(signalRService.stop).toHaveBeenCalledWith(mockConnection)
    expect(result.current.signalRData.status).toBe('disconnected')
  })

  it('throws an error when invoking without connection', async () => {
    const { result } = renderHook(() => useContext(SignalRContext), { wrapper })

    await expect(result.current.invoke('TestMethod')).rejects.toThrow('SignalR connection not established')
  })
})
