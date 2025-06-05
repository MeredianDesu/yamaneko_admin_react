/* eslint-disable compat/compat */
import { httpApi } from 'api/httpApi'
import { GETPRESIGNEDURL, RELEASES } from 'api/routes'
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
  type: 'text' | 'file'
  name: keyof Pick<
    ReleasePostEntity,
    | 'originalName'
    | 'translatedName'
    | 'status'
    | 'maxEpisodes'
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

  const [poster, setPoster] = useState<File | null>(null)
  const [posterLink, setPosterLink] = useState<string>()
  const [posterLinkUpload, setPosterLinkUpload] = useState<string>()

  const [trailer, setTrailer] = useState<File | null>(null)
  const [trailerLink, setTrailerLink] = useState<string>()
  const [trailerLinkUpload, setTrailerLinkUpload] = useState<string>()

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

  useEffect(() => {
    const getPosterLinkUpload = async () => {
      await httpApi
        .get(`${GETPRESIGNEDURL}?id=${id}&fileName=poster&type=release&isEpisode=false`)
        .then((response) => {
          setPosterLinkUpload(response.data.uploadLink)
          setPosterLink(response.data.link)
        })
        .catch((error) => {
          notification({ message: error.message, type: 'error' })
        })
    }

    getPosterLinkUpload()
  }, [])

  useEffect(() => {
    const getTrailerLinkUpload = async () => {
      await httpApi
        .get(`${GETPRESIGNEDURL}?id=${id}&fileName=trailer&type=release&isEpisode=false`)
        .then((response) => {
          setTrailerLinkUpload(response.data.uploadLink)
          setTrailerLink(response.data.link)
        })
        .catch((error) => {
          notification({ message: error.message, type: 'error' })
        })
    }

    getTrailerLinkUpload()
  }, [])

  const data: Data[] = [
    {
      label: 'Original name:',
      description: 'Enter the original name of the title.',
      name: 'originalName',
      value: release?.originalName || 'N/A',
      type: 'text',
    },
    {
      label: 'Translated name:',
      description: 'Enter the translated name of the title.',
      name: 'translatedName',
      value: release?.translatedName || 'N/A',
      type: 'text',
    },
    {
      label: 'Status:',
      description: 'Enter the status of release.',
      name: 'status',
      value: release?.status || 'N/A',
      type: 'text',
    },
    {
      label: 'Max episodes:',
      description: 'Enter the maximum episodes of release.',
      name: 'maxEpisodes',
      value: release?.maxEpisodes || 'N/A',
      type: 'text',
    },
    {
      label: 'Poster image:',
      description: systemMessages.LOW_BACK_RES,
      name: 'posterImageUrl',
      value: release?.posterImageUrl || 'N/A',
      type: 'file',
    },
    {
      label: 'Trailer:',
      description: systemMessages.LOW_BACK_RES,
      name: 'previewVideoUrl',
      value: release?.previewVideoUrl || 'N/A',
      type: 'file',
    },
    {
      label: 'Synopsis:',
      description: 'Enter the synopsis of this title.',
      name: 'synopsis',
      value: release?.synopsis || 'N/A',
      type: 'text',
    },
    {
      label: 'About:',
      description: 'Enter the text about this title.',
      name: 'info',
      value: release?.info || 'N/A',
      type: 'text',
    },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target

    if (type === 'file') return

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

  const handleVideoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: 'posterImageUrl' | 'previewVideoUrl',
  ) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      if (name === 'posterImageUrl') {
        setPoster(file)
        setFormData((prev) => ({
          ...prev,
          posterImageUrl: posterLink,
        }))
      }
      if (name === 'previewVideoUrl') {
        setTrailer(file)
        setFormData((prev) => ({
          ...prev,
          previewVideoUrl: trailerLink,
        }))
      }
    }
  }

  const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    const hasChanges = Object.keys(formData).length > 0 || poster || trailer

    if (!hasChanges) {
      notification({ message: 'No changes detected.', type: 'info' })
      return
    }

    const uploadFilesToCloud = async () => {
      const uploadPromises = []
      const acl = 'public-read'

      try {
        if (poster && posterLinkUpload) {
          uploadPromises.push(
            httpApi.put(posterLinkUpload, poster, {
              headers: {
                'Content-Type': poster?.type,
                'X-Amz-Acl': acl,
              },
              timeout: 2160000,
            }),
          )
        }
        if (trailer && trailerLinkUpload) {
          uploadPromises.push(
            httpApi.put(trailerLinkUpload, trailer, {
              headers: {
                'Content-Type': trailer?.type,
                'X-Amz-Acl': acl,
              },
              timeout: 2160000,
            }),
          )
        }

        await Promise.all(uploadPromises)
      } catch (error) {
        notification({ message: 'Uploading failed', type: 'error' })
      }
    }

    await uploadFilesToCloud()

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
                  {row.type === 'text' ? (
                    <input
                      type={row.type}
                      name={row.name}
                      value={formData[row.name] ?? release?.[row.name] ?? ''}
                      onChange={handleChange}
                    />
                  ) : (
                    (row.name === 'previewVideoUrl' || row.name === 'posterImageUrl') && (
                      <input
                        type={row.type}
                        name={row.name}
                        onChange={(e) =>
                          handleVideoChange(e, row.name as 'posterImageUrl' | 'previewVideoUrl')
                        }
                      />
                    )
                  )}
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
