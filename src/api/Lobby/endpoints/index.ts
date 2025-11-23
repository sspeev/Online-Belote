import * as allResources from './all';
import * as createResources from './create';
import * as joinResources from './join';
import * as leaveResources from './leave';

import type {LobbyResponse} from '../common';
import { apiClient } from "@/api/axios";

export const all = async () =>
    await apiClient.get<LobbyResponse>(allResources.url());

export const create = async (reqData: createResources.Request) =>
    await apiClient.post<LobbyResponse>(createResources.url(), reqData);

export const join = async (reqData: joinResources.Request) =>
    await apiClient.post<LobbyResponse>(joinResources.url(), reqData);

export const leave = async (reqData: leaveResources.Request) =>
    await apiClient.post<LobbyResponse>(leaveResources.url(), reqData);

// Uncomment when auth is implemented
// apiClient.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('authToken');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     }
// );

// apiClient.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// );