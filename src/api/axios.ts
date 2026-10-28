import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'

const BASE_URL = `${import.meta.env.VITE_SERVER_URL}`

if (!BASE_URL) {
  throw new Error('SERVER_URL is not defined. Please check your .env file.')
}

export type ApiError = {
  message: string
  status?: number
  code?: string
  details?: unknown
  isNetworkError: boolean
  isTimeout: boolean
}

export interface ApiResponse<T> {
  success: boolean
  data: T | null
  errors: string[]
  message: string | null
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

  // Handle the new ApiResponse format from backend
  const backendErrors = axiosErr.response?.data?.errors as string[] | undefined
  const backendMessage = axiosErr.response?.data?.message as string | undefined

  return {
    message: backendMessage ?? axiosErr.response?.data?.message ?? axiosErr.message,
    status,
    code,
    details: axiosErr.response?.data?.details,
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
    'X-API-Version': 'v0.1.0',
  },
})

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - unwrap ApiResponse<T> and handle errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Backend now returns ApiResponse<T> wrapper
    // We can unwrap it here so endpoints get direct access to .data
    const apiResponse = response.data as ApiResponse<unknown>
    if (apiResponse && typeof apiResponse === 'object' && 'success' in apiResponse) {
      if (!apiResponse.success) {
        // Create an error-like response for failed ApiResponse
        const error = new Error(apiResponse.message ?? 'Request failed') as Error & {
          response?: AxiosResponse
          isApiResponseError: boolean
          apiErrors: string[]
        }
        error.isApiResponseError = true
        error.apiErrors = apiResponse.errors
        error.response = response
        return Promise.reject(error)
      }
      // Return unwrapped data for successful responses
      return {
        ...response,
        data: apiResponse.data,
      } as AxiosResponse
    }
    return response
  },
  (error) => {
    if (error.response?.status === 401 && !error.isApiResponseError) {
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }

    const normalized = toApiError(error)

    // Optional global side-effects (toast/logger)
    // if (normalized.status === 500) showToast('Server error')

    return Promise.reject(normalized)
  }
)

export { apiClient }
export type { AxiosInstance }