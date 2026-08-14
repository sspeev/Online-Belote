import * as allResources from './all';
import * as createResources from './create';
import * as findResources from './find';

import type {LobbyResponse} from '../common';
import { apiClient } from "@/api/axios";

export const all = async () =>
    await apiClient.get<LobbyResponse>(allResources.url());

export const find = async (lobbyId : number) =>
  await apiClient.get<LobbyResponse>(findResources.url(lobbyId));

export const create = async (reqBody: createResources.Request) =>
    await apiClient.post<LobbyResponse>(createResources.url(), reqBody);