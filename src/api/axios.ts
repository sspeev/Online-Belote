import axios, { type AxiosInstance } from 'axios'

const BASE_URL: string = import.meta.env.VITE_API_URL

if (!BASE_URL) {
  throw new Error('VITE_API_URL is not defined. Please check your .env file.')
}

const API_VERSION = 'v0.1.0'

const apiClient: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}/api/`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Version': API_VERSION,
  },
})

// Optional: Add interceptors here if needed in the future
// apiClient.interceptors.request.use(config => {
//     // Add auth token or other logic
//     return config;
// });

// apiClient.interceptors.response.use(response => response, error => {
//     // Handle errors globally
//     return Promise.reject(error);
// });

export { apiClient };