 
 // src/api/axios.ts
 import axios, { type AxiosInstance } from 'axios'
 
 const BASE_URL = import.meta.env.VITE_API_URL ?? ''
 const API_VERSION = 'v0.1.0'
 
 if (!BASE_URL) {
   throw new Error('VITE_API_URL is not defined. Please check your .env file.')
 }
 
 export type ApiError = {
   message: string
   status?: number
   code?: string
   details?: unknown
   isNetworkError: boolean
   isTimeout: boolean
 }
 
 const toApiError = (error: unknown): ApiError => {
   if (!axios.isAxiosError<{ message?: string; details?: unknown }>(error)) {
     return {
       message: error instanceof Error ? error.message : 'Unexpected error',
       isNetworkError: false,
       isTimeout: false,
     }
   }
 
   const axiosErr = error
   const status = axiosErr.response?.status
   const code = axiosErr.code
 
   return {
     message:
       axiosErr.response?.data.message ??
       axiosErr.message,
     status,
     code,
     details: axiosErr.response?.data.details,
     isNetworkError: !axiosErr.response,
     isTimeout: code === 'ECONNABORTED',
   }
 }
 
 const apiClient: AxiosInstance = axios.create({
   baseURL: `${BASE_URL}/api/`,
   withCredentials: true,
   timeout: 5_000,
   headers: {
     'Content-Type': 'application/json',
     'X-API-Version': API_VERSION,
   },
 })
 
 apiClient.interceptors.response.use(
   (response) => response,
   (error) => {
     const normalized = toApiError(error)
 
     // Optional global side-effects (toast/logger)
     // avoid auth redirects for now since app is username-only
     // if (normalized.status === 500) showToast('Server error')
 
     return Promise.reject(normalized)
   },
 )
 
 export { apiClient }