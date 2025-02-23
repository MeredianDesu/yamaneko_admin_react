import { httpApi } from 'api/httpApi'
import { CHARACTERS } from 'api/routes'
import { type CharactersPostEntity } from 'entities/characters/charactersPostEntity'
import { type SyntheticEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { notification } from 'shared/components/Notification/Notification'
import { systemMessages } from 'shared/constants/systemMessages'
import { type CharactersType } from 'shared/types/CharacterTypes'

import styles from './EditCharacter.module.scss'

interface Data {
  label: string
  description: string
  name: keyof CharactersPostEntity
  value: string
}

export const EditCharacter = () => {
  const [character, setCharacter] = useState<CharactersType>()
  const [formData, setFormData] = useState<Partial<CharactersPostEntity>>({})

  const navigate = useNavigate()
  const { id } = useParams<string>()

  useEffect(() => {
    const fetchCharacter = async () => {
      await httpApi
        .get(`${CHARACTERS}/${id}`)
        .then((response) => {
          setCharacter(response.data)
        })
        .catch((error) => {
          notification({ message: error.message, type: 'error' })
        })
    }

    fetchCharacter()
  }, [])

  const data: Data[] = [
    {
      label: 'Original name:',
      description: 'Enter original name of the character.',
      name: 'originalName',
      value: character?.originalName || 'N/A',
    },
    {
      label: 'Translated name:',
      description: 'Enter translated name of the character.',
      name: 'translatedName',
      value: character?.translatedName || 'N/A',
    },
    {
      label: 'Image:',
      description: systemMessages.LOW_BACK_RES,
      name: 'image',
      value: character?.image || 'N/A',
    },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prev) => {
      const updated = { ...prev }

      const key = name as keyof CharactersPostEntity

      if (character && value === String(character[key])) {
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
        .patch(CHARACTERS, { ...formData })
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
              navigate(`/dashboard/characters/${id}`)
            }}
          >
            {'<'}
          </button>
          <span className={styles.page_name}>Edit {character?.translatedName}</span>
          <span className={styles.page_subject}>Enter new values for character.</span>
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
                    value={formData[row.name] ?? character?.[row.name] ?? ''}
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
