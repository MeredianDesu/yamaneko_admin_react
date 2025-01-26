/* eslint-disable compat/compat */
import axios, { type AxiosError, type AxiosInstance } from 'axios'
import { getAuthToken } from 'features/Auth/getAuthToken'
import { Slide, toast } from 'react-toastify'
import { systemMessages } from 'shared/constants/systemMessages'

import { BASE_URL } from './routes'

export const httpApi: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  maxRedirects: 0,
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
    Promise.reject(error)
  },
)

httpApi.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    toast.error(systemMessages.BAD_CREDENTIALS, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Slide,
    })

    return Promise.reject(error)
  },
)
