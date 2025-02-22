import { httpApi } from 'api/httpApi'
import { CHARACTERS } from 'api/routes'
import { useAuth } from 'features/Auth/useAuth'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'shared/components/Table/Table'
import { contentText } from 'shared/constants/contentText'
import { systemMessages } from 'shared/constants/systemMessages'
import { type CharactersType } from 'shared/types/CharacterTypes'

import styles from './Characters.module.scss'

export const Characters = () => {
  const { isAuthenticated, accessToken, isInitialized } = useAuth()
  const [data, setData] = useState<CharactersType[]>([])
  const [savedError, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { characterHeader, characterDesc, addCharacter, charactersTableName } = contentText

  useEffect(() => {
    if (!isInitialized) return
    if (!isAuthenticated || !accessToken) {
      setError(`${systemMessages.FORBIDDEN_USER} or ${systemMessages.NO_TOKEN}.`)
      setIsLoading(false)
      return
    }

    const fetchCharacters = async () => {
      await httpApi
        .get(CHARACTERS)
        .then((response) => {
          setData(response.data)
          setIsLoading(false)
        })
        .catch((error) => {
          setError(`${systemMessages.FETCH_ERROR} : ${error.message}. Try to reload page.`)
          setIsLoading(false)
        })
    }

    fetchCharacters()
  }, [isAuthenticated, accessToken])

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.head}>
            <span className={styles.page_name}>{characterHeader}</span>
            <span className={styles.page_subject}>M{characterDesc}</span>
          </div>
          <div className={styles.data}>
            <div className={styles.head_bar}>
              <span>Loading characters...</span>
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
            <span className={styles.page_name}>{characterHeader}</span>
            <span className={styles.page_subject}>{characterDesc}</span>
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
          <span className={styles.page_name}>{characterHeader}</span>
          <span className={styles.page_subject}>{characterDesc}</span>
        </div>

        <div className={styles.data}>
          <div className={styles.head_bar}>
            <span>
              {charactersTableName}
              <span className={styles.count}> {data.length}</span>
            </span>
            <Link to="/dashboard/characters/create" className={styles.add_entity}>
              {contentText.addCharacter}
            </Link>
          </div>
          <Table
            className={styles.table_container}
            data={data}
            displayedValues={['id', 'originalName', 'translatedName']}
            clickable
          />
        </div>
      </div>
    </div>
  )
}
