import { apiClient } from "../../axios";
import { type GameResponse } from '../common';
import * as startResources from './start'

export const start = async (reqData: startResources.Request) =>
    await apiClient.post<GameResponse>(startResources.url(), reqData);
