import { httpApi } from 'api/httpApi'
import { CHARACTERS } from 'api/routes'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { DetailsCard, type Metadata } from 'shared/components/DetailsCard/DetailsCard'
import { notification } from 'shared/components/Notification/Notification'
import { type CharactersType } from 'shared/types/CharacterTypes'

import styles from './SelectedCharacter.module.scss'

export const SelectedCharacter = () => {
  const [character, setCharacter] = useState<CharactersType>()
  const location = useLocation()
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
  }, [id])

  const handleDelete = async () => {
    await httpApi
      .delete(`${CHARACTERS}/${id}`)
      .then(() => {
        notification({ message: 'Character was deleted successfully', type: 'success' })
        navigate('/dashboard/characters')
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

  const data: Metadata[] = [
    { label: 'Character ID:', value: character?.id || 'N/A' },
    { label: 'Original name:', value: character?.originalName || 'N/A' },
    { label: 'Translated name:', value: character?.translatedName || 'N/A' },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.head}>
          <button type="button" className={styles.back_button} onClick={returnBack}>
            {'<'}
          </button>
          <h2>
            {character?.originalName} | {character?.translatedName}
          </h2>
          <div className={styles.management}>
            <button type="button" className={styles.button} onClick={handleDelete}>
              Delete
            </button>
            <button type="button" className={styles.button}>
              Edit
            </button>
          </div>
        </div>
        <DetailsCard image={character?.image} metadata={data} />
      </div>
    </div>
  )
}
