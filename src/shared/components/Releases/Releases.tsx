/* eslint-disable no-console */

import { httpApi } from 'api/httpApi'
import { RELEASES } from 'api/routes'
import { useAuth } from 'features/Auth/useAuth'
import { useEffect, useState } from 'react'
import { type ReleaseType } from 'shared/types/ReleaseType'

import styles from './Releases.module.scss'

export const Releases = () => {
  const { isAuthenticated, accessToken } = useAuth()
  const [data, setData] = useState<ReleaseType[]>([])
  const [savedError, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!isAuthenticated || !accessToken) {
      setError('User is not authenticated or token is missing.')
      setIsLoading(false)
      return
    }

    httpApi
      .get(RELEASES)
      .then((response) => {
        setData(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        setError(`Error while fetching releases: ${error.message}`)
        setIsLoading(false)
      })
  }, [isAuthenticated, accessToken])

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.head}>
            <span className={styles.page_name}>Releases</span>
            <span className={styles.page_subject}>Manage releases and see the latest changes.</span>
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
            <span className={styles.page_name}>Releases</span>
            <span className={styles.page_subject}>Manage releases and see the latest changes.</span>
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
          <span className={styles.page_name}>Releases</span>
          <span className={styles.page_subject}>Manage releases and see the latest changes.</span>
        </div>

        <div className={styles.releases_data}>
          <div className={styles.head_bar}>
            <span>
              All releases<span className={styles.releases_count}> {data.length}</span>
            </span>
            <button type="button" className={styles.add_release}>
              + Add release
            </button>
          </div>
          <div className={styles.table_container}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{`${row.translatedName} ( ${row.originalName} )`}</td>
                    <td>{row.status ?? 'unknown'}</td>
                    <td>{row.updated ?? 'unknown'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
