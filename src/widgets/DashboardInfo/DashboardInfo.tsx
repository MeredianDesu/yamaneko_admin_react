import styles from './DashboardInfo.module.scss'

export const DashboardInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.head}>
          <h2>Welcome to the admin panel!</h2>
        </div>
      </div>
    </div>
  )
}
