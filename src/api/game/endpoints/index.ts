import { apiClient } from "../../axios";
import type { GameStartData } from '../common';
import * as startResources from './start'

export const start = async (lobbyId : number) =>
    await apiClient.post<GameStartData>(startResources.url(lobbyId));