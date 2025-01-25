import { httpApi } from 'api/httpApi'
import { TEAM } from 'api/routes'
import { useAuth } from 'features/Auth/useAuth'
import { useEffect, useState } from 'react'
import { Table } from 'shared/components/Table/Table'
import { contentText } from 'shared/constants/contentText'
import { systemMessages } from 'shared/constants/systemMessages'
import { type TeamType } from 'shared/types/TeamType'

import styles from './Team.module.scss'

export const Team = () => {
  const { isAuthenticated, accessToken } = useAuth()
  const [data, setData] = useState<TeamType[]>([])
  const [savedError, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { teamHeader, teamDesc, addTeamMember, teamTableName } = contentText

  useEffect(() => {
    if (!isAuthenticated || !accessToken) {
      setError(`${systemMessages.FORBIDDEN_USER} or ${systemMessages.NO_TOKEN}.`)
      setIsLoading(false)
      return
    }

    httpApi
      .get(TEAM)
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
            <span className={styles.page_name}>{teamHeader}</span>
            <span className={styles.page_subject}>{teamDesc}</span>
          </div>
          <div className={styles.data}>
            <div className={styles.head_bar}>
              <span>Loading members...</span>
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
            <span className={styles.page_name}>{teamHeader}</span>
            <span className={styles.page_subject}>{teamDesc}</span>
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
          <span className={styles.page_name}>{teamHeader}</span>
          <span className={styles.page_subject}>{teamDesc}</span>
        </div>

        <div className={styles.data}>
          <div className={styles.head_bar}>
            <span>
              {teamTableName}
              <span className={styles.count}> {data.length}</span>
            </span>
            <button type="button" className={styles.add_entity}>
              {addTeamMember}
            </button>
          </div>
          <Table
            className={styles.table_container}
            data={data}
            displayedValues={['id', 'name', 'user.username']}
          />
        </div>
      </div>
    </div>
  )
}
