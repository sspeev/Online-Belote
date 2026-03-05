import * as signalR from '@microsoft/signalr'

const BASE_URL : string = import.meta.env.VITE_API_URL ?? ''
const MAX_RETRY_ATTEMPTS = 5
const RETRY_DELAY_MS = 5000

export const buildConnection = (lobbyId: number): signalR.HubConnection => {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(
      `${BASE_URL}/beloteHub?lobbyId=${encodeURIComponent(lobbyId)}`,
    )
    .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
    .build()

  connection.keepAliveIntervalInMilliseconds = 10_000
  connection.serverTimeoutInMilliseconds = 60_000

  return connection
}

export const start = async (
  connection: signalR.HubConnection,
  retryCount = 0,
): Promise<void> => {
  try {
    await connection.start()
  } catch (err) {
    if (retryCount >= MAX_RETRY_ATTEMPTS) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unknown connection error'
      throw new Error(
        `Failed to connect after ${MAX_RETRY_ATTEMPTS} attempts: ${errorMessage}`,
      )
    }
    console.warn(
      `SignalR connection attempt ${retryCount + 1} failed, retrying in ${RETRY_DELAY_MS}ms...`,
    )
    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS))
    return start(connection, retryCount + 1)
  }
}

export const stop = async (
  connection: signalR.HubConnection,
): Promise<void> => {
  try {
    await connection.stop()
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error('Error stopping SignalR connection:', errorMessage)
  }
}
