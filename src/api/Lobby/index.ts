import axios from 'axios';
import { API_BASE_URL } from '../common';
import * as allResources from '../Lobby/all'
import * as createResources from '../Lobby/create'
import * as joinResources from '../Lobby/join'
import * as leaveResources from '../Lobby/leave'
import * as startResources from '../Lobby/start'

// export const all = async (req: allResources.Request) =>
//     await axios get<Result<>>

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