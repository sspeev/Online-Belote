import * as signalR from '@microsoft/signalr'

const MAX_RETRY_ATTEMPTS = 5
const RETRY_DELAY_MS = 5000

export const buildConnection = (lobbyId: number): signalR.HubConnection =>
  new signalR.HubConnectionBuilder()
    .withUrl(`${import.meta.env.VITE_API_URL}/beloteHub?lobbyId=${encodeURIComponent(lobbyId)}`)
    .withAutomaticReconnect()
    .build()

export const start = async (connection: signalR.HubConnection, retryCount = 0): Promise<void> => {
  try {
    await connection.start()
  } catch (err) {
    if (retryCount >= MAX_RETRY_ATTEMPTS) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown connection error'
      throw new Error(`Failed to connect after ${MAX_RETRY_ATTEMPTS} attempts: ${errorMessage}`)
    }
    console.warn(`SignalR connection attempt ${retryCount + 1} failed, retrying in ${RETRY_DELAY_MS}ms...`)
    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS))
    return start(connection, retryCount + 1)
  }
}

export const stop = async (connection: signalR.HubConnection): Promise<void> => {
  try {
    await connection.stop()
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error('Error stopping SignalR connection:', errorMessage)
  }
}
