import { httpApi } from 'api/httpApi'
import { RELEASES } from 'api/routes'
import { useAuth } from 'features/Auth/useAuth'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'shared/components/Table/Table'
import { contentText } from 'shared/constants/contentText'
import { systemMessages } from 'shared/constants/systemMessages'
import { type ReleaseType } from 'shared/types/ReleaseType'

import styles from './Releases.module.scss'

export const Releases = () => {
  const { isAuthenticated, accessToken, isInitialized } = useAuth()
  const [data, setData] = useState<ReleaseType[]>([])
  const [savedError, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!isInitialized) return
    if (!isAuthenticated || !accessToken) {
      setError(`${systemMessages.FORBIDDEN_USER} or ${systemMessages.NO_TOKEN}.`)
      setIsLoading(false)
      return
    }
    const fetchReleases = async () => {
      await httpApi
        .get(RELEASES)
        .then((response) => {
          setData(response.data ?? [])
          setIsLoading(false)
        })
        .catch((error) => {
          setError(`${systemMessages.FETCH_ERROR} : ${error.message}. Try to reload page.`)
          setIsLoading(false)
        })
    }

    fetchReleases()
  }, [])

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.head}>
            <span className={styles.page_name}>{contentText.releaseHeader}</span>
            <span className={styles.page_subject}>{contentText.releasesDesc}</span>
          </div>
          <div className={styles.releases_data}>
            <div className={styles.head_bar}>
              <span>Loading releases...</span>
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
            <span className={styles.page_name}>{contentText.releaseHeader}</span>
            <span className={styles.page_subject}>{contentText.releasesDesc}</span>
          </div>
          <div className={styles.releases_data}>
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
          <span className={styles.page_name}>{contentText.releaseHeader}</span>
          <span className={styles.page_subject}>{contentText.releasesDesc}</span>
        </div>

        <div className={styles.releases_data}>
          <div className={styles.head_bar}>
            <span>
              {contentText.releasesTableName}
              <span className={styles.releases_count}> {data.length}</span>
            </span>
            <Link to="/dashboard/releases/create" className={styles.add_release}>
              {contentText.addRelease}
            </Link>
          </div>
          <Table
            className={styles.table_container}
            data={data}
            displayedValues={['id', 'translatedName', 'originalName', 'status', 'updated']}
            clickable
          />
        </div>
      </div>
    </div>
  )
}
