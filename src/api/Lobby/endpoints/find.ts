import { FIND_URL } from '../common'

export type Request = {
  lobbyId: number
}

export const url: (lobbyId: number) => string = (lobbyId: number) =>
  `${FIND_URL(lobbyId)}`
