import { httpApi } from 'api/httpApi'
import { RELEASES } from 'api/routes'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { DetailsCard } from 'shared/components/DetailsCard/DetailsCard'
import { notification } from 'shared/components/Notification/Notification'
import { type ReleaseType } from 'shared/types/ReleaseType'
import { DubbersList } from 'widgets/CharactersList/DubbersList'
import { EpisodesList } from 'widgets/EpisodesList/EpisodesList'

import styles from './SelectedRelease.module.scss'

export const SelectedRelease = () => {
  const [data, setData] = useState<ReleaseType>()
  const [savedError, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const location = useLocation()
  const navigate = useNavigate()
  const { id } = useParams<string>()

  useEffect(() => {
    const fetchRelease = async () => {
      await httpApi
        .get(`${RELEASES}/${id}`)
        .then((response) => {
          setData(response.data)
          setIsLoading(false)
        })
        .catch((error) => {
          setError(error.message)
          setIsLoading(false)
        })
    }

    fetchRelease()
  }, [id])

  const handleDelete = async () => {
    await httpApi
      .delete(`${RELEASES}/${id}`)
      .then(() => {
        notification({ message: 'Release was deleted successfully', type: 'success' })
        navigate('/dashboard/releases')
      })
      .catch((error) => {
        notification({ message: error.message, type: 'error' })
      })
  }

  const returnBack = () => {
    const idLength = id?.length ?? 0
    const path = location.pathname.substring(0, location.pathname.length - idLength)
    navigate(path)
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.head}>
            <h2>LOADING</h2>
          </div>
        </div>
      </div>
    )
  }

  if (!isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.head}>
            <button type="button" className={styles.back_button} onClick={returnBack}>
              {'<'}
            </button>
            <h2>{data?.translatedName}</h2>
            <div className={styles.management}>
              <button type="button" className={styles.button} onClick={handleDelete}>
                Delete
              </button>
              <button type="button" className={styles.button} onClick={() => navigate('edit')}>
                Edit
              </button>
            </div>
          </div>
          <div className={styles.details}>
            <DetailsCard
              image={data?.posterImageUrl}
              metadata={[
                { label: 'Original Name: ', value: data?.originalName || 'N/A' },
                { label: 'Translated name: ', value: data?.translatedName || 'N/A' },
                { label: 'Status: ', value: data?.status || 'N/A' },
                { label: 'Age restriction: ', value: data?.ageRestriction || 'N/A' },
                { label: 'Updated: ', value: data?.updatedAt || 'N/A' },
                { label: 'Uploaded: ', value: data?.uploadedAt || 'N/A' },
              ]}
            />
            <EpisodesList episodes={data?.episodes ?? []} />
            <DubbersList characters={data?.dubbers ?? []} />
          </div>
        </div>
      </div>
    )
  }
}
