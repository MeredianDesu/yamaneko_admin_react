/* eslint-disable no-console */
import axios, { type AxiosError, type AxiosInstance } from 'axios'
import { getAuthToken } from 'features/Auth/getAuthToken'

import { BASE_URL } from './routes'

const { accessToken } = getAuthToken()

export const httpApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
  withCredentials: true,
  maxRedirects: 0,
})

httpApi.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    console.log(`Fetch error${error}`)
    // eslint-disable-next-line compat/compat
    return Promise.reject(error)
  },
)
