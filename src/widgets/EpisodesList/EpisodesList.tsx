import styles from './EpisodesList.module.scss'

export const EpisodesList = () => {
  return (
    <div className={styles.episodes_list}>
      <div className={styles.episodes_list_header}>
        <span className={styles.block_name}>Episodes</span>
        <span className={styles.block_subject}>All available episodes of this anime are displayed here.</span>
      </div>
    </div>
  )
}
