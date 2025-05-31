import styles from './TeamAddition.module.scss'

export const TeamAddition = () => {
  return (
    <form action="" className={styles.container}>
      <div className={styles.content}>
        <div className={styles.head}>
          <div className={styles.back_button}>←</div>
          <div className={styles.page_name}>Add new user to team</div>
          <div className={styles.page_subject}>Fill the fields for the new member.</div>
        </div>
      </div>
    </form>
  )
}
