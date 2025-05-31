import { Link, useLocation } from 'react-router-dom'
import { Image } from 'shared/components/Image/Image'
import { type EpisodesType } from 'shared/types/EpisodesTypes'

import styles from './EpisodesList.module.scss'

interface Props {
  episodes: EpisodesType[]
}

export const EpisodesList = ({ episodes }: Props) => {
  const location = useLocation()

  return (
    <div className={styles.episodes_list}>
      <div className={styles.episodes_list_header}>
        <span className={styles.block_name}>Episodes</span>
        <span className={styles.block_subject}>All available episodes of this anime are displayed here.</span>
      </div>
      <div className={styles.episodes}>
        <div className={styles.card_add_episode}>
          <Link to={`${location.pathname}/add_episode`} className={styles.add_button_vector}>
            +
          </Link>
          <span className={styles.add_text}>Add Episode</span>
        </div>
        {episodes.map((episode) => {
          return (
            <div key={episode.episodeNumber} className={styles.card}>
              <Image
                className={styles.thumb}
                src="https://yamanekospace.fra1.cdn.digitaloceanspaces.com/mascot"
              />
              <div className={styles.card_text}>
                <span className={styles.episode_name}>{episode.episodeName}</span>
                <span className={styles.episode_number}>Episode {episode.episodeNumber}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
