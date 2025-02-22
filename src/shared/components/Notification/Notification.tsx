import { Slide, toast, type ToastOptions, type TypeOptions } from 'react-toastify'

interface Props {
  message: string
  type?: TypeOptions
}

export const notification = ({ message, type = 'default' }: Props) => {
  const options: ToastOptions = {
    type,
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    transition: Slide,
  }

  return toast(message, options)
}
