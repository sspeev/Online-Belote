export type LobbyAction = 
| { type: 'CREATE'; playerName: string; }
| { type: 'JOIN'; playerName: string; lobbyId: number; }