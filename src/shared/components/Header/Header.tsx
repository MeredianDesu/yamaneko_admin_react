import { useAuth } from 'features/Auth/useAuth'
import { Slide, toast } from 'react-toastify'
import { systemMessages } from 'shared/constants/systemMessages'

import styles from './Header.module.scss'

export const Header = () => {
  const { logout } = useAuth()

  const handleClick = () => {
    toast.info(systemMessages.LOGOUT, {
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
    logout()
  }

  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}>
        YAMANEKO
      </a>
      <button className={styles.log_out} type="button" onClick={handleClick}>
        Log out
      </button>
    </header>
  )
}
