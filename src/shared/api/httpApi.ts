/* eslint-disable compat/compat */
import axios, { type AxiosError, type AxiosInstance, HttpStatusCode } from 'axios'
import { getAuthToken } from 'features/Auth/getAuthToken'
import { removeAuthToken } from 'features/Auth/removeAuthToken'
import { setAuthToken } from 'features/Auth/setAuthToken'
import { notification } from 'shared/components/Notification/Notification'

import { BASE_URL, REFRESH } from './routes'

export const httpApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  // baseURL: LOCAL_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  maxRedirects: 0,
  timeout: 15000,
})

httpApi.interceptors.request.use(
  (config) => {
    const { accessToken } = getAuthToken()
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    // Проверяем, что config.url существует, прежде чем использовать его
    if (config.url && config.url.includes('yamanekospace.fra1.digitaloceanspaces.com')) {
      delete config.headers.Authorization
    }

    return config
  },
  (error) => {
    notification({ message: error.message, type: 'error' })
    return Promise.reject(error)
  },
)

httpApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { accessToken } = getAuthToken()
    if (error.response?.status === HttpStatusCode.Unauthorized && accessToken) {
      try {
        const { data } = await httpApi.post(REFRESH)
        setAuthToken(data.accessToken)
        error.config.headers.Authorization = `Bearer ${data.accessToken}`

        return httpApi(error.config)
      } catch (refreshError) {
        const requestError = refreshError as AxiosError
        if (
          requestError.status === HttpStatusCode.NotFound ||
          requestError.status === HttpStatusCode.Forbidden
        ) {
          removeAuthToken()
          notification({ message: error.message, type: 'error' })
        }

        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  },
)
