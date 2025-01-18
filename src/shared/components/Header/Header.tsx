import { useAuth } from 'features/Auth/useAuth'

import styles from './Header.module.scss'

export const Header = () => {
  const { logout } = useAuth()

  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}>
        YAMANEKO
      </a>
      <button className={styles.log_out} type="button" onClick={logout}>
        Log out
      </button>
    </header>
  )
}
