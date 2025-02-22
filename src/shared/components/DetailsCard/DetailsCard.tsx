/* eslint-disable react/no-array-index-key */
import styles from './DetailsCard.module.scss'

export interface Metadata {
  label: string
  value: string | number
}

export interface Props {
  image: string | undefined
  metadata: Metadata[]
}

export const DetailsCard = ({ image = 'https://yamaneko.isn.one/files/mascot.jfif', metadata }: Props) => {
  return (
    <div className={styles.details_card}>
      <img src={image} alt="img" />
      <div className={styles.meta}>
        {metadata.map((row, idx) => {
          return (
            <div key={idx} className={styles.card_row}>
              <strong>{row.label}</strong>
              <span>{row.value}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
