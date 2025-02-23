import { httpApi } from 'api/httpApi'
import { RELEASES } from 'api/routes'
import { type ReleasePostEntity } from 'entities/releases/releasePostEntity'
import { type SyntheticEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { notification } from 'shared/components/Notification/Notification'
import { systemMessages } from 'shared/constants/systemMessages'
import { type ReleaseType } from 'shared/types/ReleaseType'

import styles from './EditRelease.module.scss'

interface Data {
  label: string
  description: string
  name: keyof Pick<
    ReleasePostEntity,
    | 'originalName'
    | 'translatedName'
    | 'posterImageUrl'
    | 'previewVideoUrl'
    | 'videoUrl'
    | 'synopsis'
    | 'info'
  >
  value: string
}

export const EditRelease = () => {
  const [release, setRelease] = useState<ReleaseType>()
  const [formData, setFormData] = useState<Partial<ReleasePostEntity>>({})

  const navigate = useNavigate()
  const { id } = useParams<string>()

  useEffect(() => {
    const fetchRelease = async () => {
      await httpApi
        .get(`${RELEASES}/${id}`)
        .then((response) => {
          setRelease(response.data)
        })
        .catch((error) => {
          notification({ message: error.message, type: 'error' })
        })
    }

    fetchRelease()
  }, [id])

  const data: Data[] = [
    {
      label: 'Original name:',
      description: 'Enter the original name of the title.',
      name: 'originalName',
      value: release?.originalName || 'N/A',
    },
    {
      label: 'Translated name:',
      description: 'Enter the translated name of the title.',
      name: 'translatedName',
      value: release?.translatedName || 'N/A',
    },
    {
      label: 'Poster image:',
      description: systemMessages.LOW_BACK_RES,
      name: 'posterImageUrl',
      value: release?.posterImageUrl || 'N/A',
    },
    {
      label: 'Trailer:',
      description: systemMessages.LOW_BACK_RES,
      name: 'previewVideoUrl',
      value: release?.previewVideoUrl || 'N/A',
    },
    {
      label: 'Video:',
      description: systemMessages.LOW_BACK_RES,
      name: 'videoUrl',
      value: release?.videoUrl || 'N/A',
    },
    {
      label: 'Synopsis:',
      description: 'Enter the synopsis of this title.',
      name: 'synopsis',
      value: release?.synopsis || 'N/A',
    },
    {
      label: 'About:',
      description: 'Enter the text about this title.',
      name: 'info',
      value: release?.info || 'N/A',
    },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prev) => {
      const updated = { ...prev }

      const key = name as keyof ReleasePostEntity

      if (release && value === String(release[key])) {
        delete updated[key]
      } else {
        updated[key] = value as never // Принудительно кастуем к `never`, чтобы избежать ошибки
      }

      return updated
    })
  }

  const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (Object.keys(formData).length === 0) {
      notification({ message: 'No changes detected.', type: 'info' })
      return
    }

    const patchChanges = async () => {
      httpApi
        .patch(`${RELEASES}/${id}`, { ...formData })
        .then(() => {
          notification({ message: 'Changes were successfully submitted', type: 'success' })
          navigate('/dashboard/releases')
        })
        .catch((error) => {
          notification({ message: error.message, type: 'error' })
        })
    }

    patchChanges()
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.head}>
          <button
            type="button"
            className={styles.back_button}
            onClick={() => {
              navigate(`/dashboard/releases/${id}`)
            }}
          >
            {'<'}
          </button>
          <span className={styles.page_name}>Edit {release?.translatedName}</span>
          <span className={styles.page_subject}>Enter new values for release.</span>
        </div>
        <form className={styles.form} onSubmit={onSubmit}>
          {data.map((row) => {
            return (
              <div key={row.label} className={styles.row}>
                <div className={styles.input_row}>
                  <div className={styles.prop}>{row.label}</div>
                  <input
                    type="text"
                    name={row.name}
                    value={formData[row.name] ?? release?.[row.name] ?? ''}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.description}>
                  <span>{row.description}</span>
                </div>
              </div>
            )
          })}
          <div className={styles.submit_form_container}>
            <button type="submit" className={styles.submit_form}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
