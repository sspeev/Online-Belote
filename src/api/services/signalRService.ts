import * as signalR from '@microsoft/signalr'

export const buildConnection = (lobbyId: number): signalR.HubConnection =>
  new signalR.HubConnectionBuilder()
    .withUrl(`${import.meta.env.VITE_API_URL}/beloteHub?lobbyId=${encodeURIComponent(lobbyId)}`)
    .withAutomaticReconnect()
    .build()

export const start = async (connection: signalR.HubConnection) => {
  try {
    await connection.start()
  } catch (err) {
    setTimeout(start, 5000)
  }
}

export const stop = async (connection: signalR.HubConnection) =>
  await connection.stop()
