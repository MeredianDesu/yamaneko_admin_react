import { httpApi } from 'api/httpApi'
import { GENRES } from 'api/routes'
import { type GenresPostEntity } from 'entities/genres/genresPostEntity'
import { type SyntheticEvent, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { notification } from 'shared/components/Notification/Notification'

import styles from './CreateGenre.module.scss'

interface Data {
  label: string
  description: string
  name: keyof GenresPostEntity
}

const data: Data[] = [{ label: 'Genre name:', description: 'Enter name of the genre.', name: 'name' }]

export const CreateGenre = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const submitForm = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    const genreValue: GenresPostEntity = {
      name: inputRef.current?.value || '',
    }

    const sendCredentials = async () => {
      await httpApi
        .post(GENRES, genreValue)
        .then(() => {
          notification({ message: 'Genre added successfully', type: 'success' })
          navigate('/dashboard/genres')
        })
        .catch((error) => {
          notification({ message: error.message, type: 'error' })
        })
    }

    sendCredentials()
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.genre_form} onSubmit={submitForm}>
          {data.map((row) => {
            return (
              <div key={row.label} className={styles.row}>
                <div className={styles.input_row}>
                  <div className={styles.prop}>{row.label}</div>
                  <input type="text" name={row.name} ref={inputRef} />
                </div>
                <div className={styles.description}>
                  <span>{row.description}</span>
                </div>
              </div>
            )
          })}
          <div className={styles.submit_form_container}>
            <button type="submit" className={styles.submit_form}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
