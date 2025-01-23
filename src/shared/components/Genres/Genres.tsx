import { httpApi } from 'api/httpApi'
import { GENRES } from 'api/routes'
import { useAuth } from 'features/Auth/useAuth'
import { useEffect, useState } from 'react'
import { contentText } from 'shared/constants/contentText'
import { systemMessages } from 'shared/constants/systemMessages'
import { type GenresType } from 'shared/types/GenresTypes'

import { Table } from '../Table/Table'
import styles from './Genres.module.scss'

export const Genres = () => {
  const { isAuthenticated, accessToken } = useAuth()
  const [data, setData] = useState<GenresType[]>([])
  const [savedError, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { genresHeader, genresDesc, addGenre, genreTableName } = contentText

  useEffect(() => {
    if (!isAuthenticated || !accessToken) {
      setError(`${systemMessages.FORBIDDEN_USER} or ${systemMessages.NO_TOKEN}.`)
      setIsLoading(false)
      return
    }

    httpApi
      .get(GENRES)
      .then((response) => {
        setData(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        setError(`${systemMessages.FETCH_ERROR} : ${error.message}. Try to reload page.`)
        setIsLoading(false)
      })
  }, [isAuthenticated, accessToken])

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.head}>
            <span className={styles.page_name}>{genresHeader}</span>
            <span className={styles.page_subject}>{genresHeader}</span>
          </div>
          <div className={styles.data}>
            <div className={styles.head_bar}>
              <span>Loading genres...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (savedError) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.head}>
            <span className={styles.page_name}>{genresHeader}</span>
            <span className={styles.page_subject}>{genresDesc}</span>
          </div>
          <div className={styles.data}>
            <div className={styles.head_bar}>
              <span>{savedError}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.head}>
          <span className={styles.page_name}>{genresHeader}</span>
          <span className={styles.page_subject}>{genresDesc}</span>
        </div>

        <div className={styles.data}>
          <div className={styles.head_bar}>
            <span>
              {genreTableName}
              <span className={styles.count}> {data.length}</span>
            </span>
            <button type="button" className={styles.add_entity}>
              {addGenre}
            </button>
          </div>
          <Table className={styles.table_container} data={data} displayedValues={['id', 'name']} />
        </div>
      </div>
    </div>
  )
}
