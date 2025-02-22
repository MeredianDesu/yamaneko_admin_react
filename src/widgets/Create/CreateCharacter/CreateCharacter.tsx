import { httpApi } from 'api/httpApi'
import { CHARACTERS } from 'api/routes'
import { type CharactersPostEntity } from 'entities/characters/charactersPostEntity'
import { type SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { notification } from 'shared/components/Notification/Notification'
import { systemMessages } from 'shared/constants/systemMessages'

import styles from './CreateCharacter.module.scss'

interface Data {
  label: string
  description: string
  name: keyof CharactersPostEntity
}

const data: Data[] = [
  { label: 'Original name:', description: 'Enter original name of the character.', name: 'originalName' },
  {
    label: 'Translated name:',
    description: 'Enter translated name of the character.',
    name: 'translatedName',
  },
  { label: 'Image:', description: systemMessages.LOW_BACK_RES, name: 'image' },
]

export const CreateCharacter = () => {
  const navigate = useNavigate()

  const submitForm = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData: Record<string, string> = {}

    Array.from(e.currentTarget.elements)
      .filter((element) => {
        const input = element as HTMLInputElement
        return input.name && input.value !== undefined
      })
      .forEach((element) => {
        const input = element as HTMLInputElement
        formData[input.name] = input.value
      })

    const sendCredentials = async () => {
      await httpApi
        .post(CHARACTERS, { ...formData })
        .then(() => {
          notification({ message: 'Character was added successfully', type: 'success' })
          navigate('/dashboard/characters')
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
                  <input type="text" name={row.name} />
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
