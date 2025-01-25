import { MASCOT } from 'api/routes'
import { type DubbersType } from 'shared/types/DubbersType'

import styles from './DubbersList.module.scss'

interface Props {
  characters: Array<
    Pick<DubbersType, 'characterId' | 'characterTranslatedName' | 'characterImage' | 'dubberName'>
  >
}

export const DubbersList = ({ characters }: Props) => {
  return (
    <div className={styles.dubbers_list}>
      <div className={styles.dubbers_list_header}>
        <span className={styles.block_name}>Dubbers</span>
        <span className={styles.block_subject}>
          This is where the people who voiced the characters are displayed.
        </span>
      </div>
      <div className={styles.dubbers_list_data}>
        {characters.map((char) => {
          return (
            <div className={styles.character_item} key={char.characterId}>
              <img src={char.characterImage || MASCOT} alt="img" />
              <span className={styles.character_name}>{char.characterTranslatedName}</span>
              <span className={styles.dubber_name}>{char.dubberName}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
