import * as allResources from './all';
import * as createResources from './create';
import * as findResources from './find';

import type { LobbyData, LobbiesData } from '../common';
import { apiClient } from "@/api/axios";

export const all = async () =>
    await apiClient.get<LobbiesData>(allResources.url());

export const find = async (lobbyId : number) =>
  await apiClient.get<LobbyData>(findResources.url(lobbyId));

export const create = async (reqBody: createResources.Request) =>
    await apiClient.post<LobbyData>(createResources.url(), reqBody);