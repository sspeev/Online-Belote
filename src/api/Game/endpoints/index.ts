import { apiClient } from "../../axios";
import { type GameResponse } from '../common';
import * as startResources from './start'

export const start = async (lobbyId : number) =>
    await apiClient.post<GameResponse>(startResources.url(lobbyId));
