/* eslint-disable compat/compat */
import { httpApi } from 'api/httpApi'
import { GETPRESIGNEDURL, RELEASES } from 'api/routes'
import { type AxiosProgressEvent } from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { notification } from 'shared/components/Notification/Notification'

import styles from './EpisodeAddition.module.scss'

export const EpisodeAddition = () => {
  const [episodeName, setEpisodeName] = useState<string>('')
  const { id } = useParams<string>()

  const qualities = ['480p', '720p', '1080p']
  const [files, setFiles] = useState<Record<string, File | null>>(
    Object.fromEntries(qualities.map((q) => [q, null])),
  )
  const [uploadLinks, setUploadLinks] = useState<Record<string, string>>({})
  const [videoLinks, setVideoLinks] = useState<Record<string, string>>({})
  const [progress, setProgress] = useState<Record<string, number>>(
    Object.fromEntries(qualities.map((q) => [q, 0])),
  )

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const promises = qualities.map(async (quality) => {
          const response = await httpApi.get(
            `${GETPRESIGNEDURL}?id=${id}&fileName=${quality}&type=release&isEpisode=true`,
          )
          return [quality, response.data]
        })

        const results = await Promise.all(promises)
        setUploadLinks(Object.fromEntries(results.map(([q, data]) => [q, data.uploadLink])))
        setVideoLinks(Object.fromEntries(results.map(([q, data]) => [q, data.link])))
      } catch (error) {
        notification({ message: 'Error fetching upload links', type: 'error' })
      }
    }
    fetchLinks()
  }, [id])

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, quality: string) => {
  //   const file = event.target.files?.[0] || null
  // if (file && !file.name.endsWith('.m3u8')) {
  //   notification({ message: 'Only .m3u8 files are allowed!', type: 'error' })
  //   return
  // }
  //   setFiles((prev) => ({ ...prev, [quality]: file }))
  // }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, quality: string) => {
    const file = event.target.files?.[0] || null
    if (!file) return

    setFiles((prev) => ({ ...prev, [quality]: file }))

    try {
      const response = await httpApi.get(
        `${GETPRESIGNEDURL}?id=${id}&fileName=${quality}&type=release&isEpisode=true`,
      )
      setUploadLinks((prev) => ({ ...prev, [quality]: response.data.uploadLink }))
      setVideoLinks((prev) => ({ ...prev, [quality]: response.data.link }))
    } catch (error) {
      notification({ message: `Error fetching upload link for ${quality}`, type: 'error' })
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const acl = 'public-read'

    const updateProgress = (quality: string, progressEvent: AxiosProgressEvent) => {
      const { loaded, total } = progressEvent
      if (total !== undefined) {
        const percentage = Math.floor((loaded * 100) / total)
        setProgress((prev) => ({ ...prev, [quality]: percentage }))
      }
    }

    try {
      const uploadedQualities = await Promise.all(
        qualities
          .filter((quality) => files[quality] && uploadLinks[quality])
          .map(async (quality) => {
            await httpApi.put(uploadLinks[quality], files[quality], {
              headers: { 'Content-Type': files[quality]?.type, 'X-Amz-Acl': acl },
              timeout: 2160000,
              onUploadProgress: (progressEvent) => updateProgress(quality, progressEvent),
            })
            return quality
          }),
      )

      const uploadedVideoLinks = uploadedQualities.map((quality) => ({
        quality,
        url: videoLinks[quality],
      }))

      await httpApi.patch(`${RELEASES}/${id}`, {
        episodes: [
          {
            episodeName,
            qualities: uploadedVideoLinks,
          },
        ],
      })

      notification({ message: 'Episode successfully added', type: 'success' })
    } catch (error) {
      notification({ message: 'Upload error', type: 'error' })
    }
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.content}>
        <div className={styles.head}>
          <div className={styles.back_button}>←</div>
          <div className={styles.page_name}>Add new episode</div>
          <div className={styles.page_subject}>Fill the fields for the new episode.</div>
        </div>

        <div className={styles.form}>
          <div className={styles.row}>
            <div className={styles.input_row}>
              <div className={styles.prop}>Episode name:</div>
              <input
                type="text"
                name="episodeName"
                placeholder="Enter episode name"
                value={episodeName}
                onChange={(e) => setEpisodeName(e.target.value)}
                required
              />
            </div>
          </div>

          {qualities.map((quality) => (
            <div className={styles.row} key={quality}>
              <div className={styles.input_row}>
                <div className={styles.prop}>File for {quality}:</div>
                <button
                  type="button"
                  className={styles.file_input_button}
                  onClick={() => document.getElementById(`file-${quality}`)?.click()}
                >
                  Choose file
                </button>
                <input
                  type="file"
                  id={`file-${quality}`}
                  className={styles.file_input}
                  onChange={(e) => handleFileChange(e, quality)}
                />
                <div className={styles.file_name}>
                  {files[quality] ? `Uploaded file: ${files[quality]?.name}` : ''}
                </div>
              </div>
              <progress value={progress[quality]} max={100} className={styles.progressBar} />
            </div>
          ))}

          <div className={styles.submit_form_container}>
            <button type="submit" className={styles.submit_form}>
              Add
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
