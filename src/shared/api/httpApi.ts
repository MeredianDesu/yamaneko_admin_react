/* eslint-disable compat/compat */
import axios, { type AxiosError, type AxiosInstance } from 'axios'
import { getAuthToken } from 'features/Auth/getAuthToken'
import { notification } from 'shared/components/Notification/Notification'

import { BASE_URL } from './routes'

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    _retryCount?: number // Добавляем кастомное свойство
  }
}

export const httpApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  maxRedirects: 0,
  timeout: 15000,
})

httpApi.interceptors.request.use(
  (config) => {
    const { accessToken } = getAuthToken()
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    notification({ message: error.message, type: 'error' })
    Promise.reject(error)
  },
)

const MAX_RETRIES = 3

httpApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const { config, response } = error

    if (!config) {
      return Promise.reject(error)
    }

    const retryCount = (config._retryCount || 0) + 1

    // if (response?.status === 401 && retryCount < MAX_RETRIES) {
    //   config._retryCount = retryCount

    //   try {
    //     console.log(response.status)
    //     const fallbackResponse = await httpApi.post(REFRESH, {
    //       accessToken: getAuthToken().accessToken,
    //     })

    //     const newAccessToken = fallbackResponse.data.accessToken

    //     if (newAccessToken) {
    //       config.headers.Authorization = `Bearer ${newAccessToken}`
    //       setAuthToken(newAccessToken)
    //     }
    //     if (fallbackResponse.status === 404) {
    //       removeAuthToken()
    //       notification({ message: 'You need to login again', type: 'warning' })
    //     }

    //     return httpApi(config)
    //   } catch (refreshError) {
    //     return Promise.reject(refreshError)
    //   }
    // }

    notification({ message: error.message, type: 'error' })
    return Promise.reject(error)
  },
)
