import axios, { type AxiosError, type AxiosInstance } from 'axios'
import { getAuthToken } from 'features/Auth/getAuthToken'
import { Slide, toast } from 'react-toastify'
import { systemMessages } from 'shared/constants/systemMessages'

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

    // eslint-disable-next-line compat/compat
    return Promise.reject(error)
  },
)
