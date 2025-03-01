/* eslint-disable react/no-array-index-key */
import { httpApi } from 'api/httpApi'
import { CHARACTERS, GENRES, RELEASES, TEAM } from 'api/routes'
import { type ReleasePostEntity } from 'entities/releases/releasePostEntity'
import { type SyntheticEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { notification } from 'shared/components/Notification/Notification'
import { systemMessages } from 'shared/constants/systemMessages'
import { type CharactersType } from 'shared/types/CharacterTypes'
import { type GenresType } from 'shared/types/GenresTypes'
import { type TeamType } from 'shared/types/TeamType'

import styles from './CreateRelease.module.scss'

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
}

interface DubberCharacterPair {
  dubberId: string
  charactersId: string
}

const data: Data[] = [
  { label: 'Original name:', description: 'Enter the original name of the title.', name: 'originalName' },
  {
    label: 'Translated name:',
    description: 'Enter the translated name of the title.',
    name: 'translatedName',
  },
  { label: 'Poster image:', description: systemMessages.LOW_BACK_RES, name: 'posterImageUrl' },
  { label: 'Trailer:', description: systemMessages.LOW_BACK_RES, name: 'previewVideoUrl' },
  { label: 'Video:', description: systemMessages.LOW_BACK_RES, name: 'videoUrl' },
  { label: 'Synopsis:', description: 'Enter the synopsis of this title.', name: 'synopsis' },
  { label: 'About:', description: 'Enter the text about this title.', name: 'info' },
]

export const CreateRelease = () => {
  const [dubbers, setDubbers] = useState<TeamType[]>([])
  const [characters, setCharacters] = useState<CharactersType[]>([])
  const [genres, setGenres] = useState<GenresType[]>([])
  const [selectedGenres, setSelectedGenres] = useState<GenresType[]>([{ id: -1, name: 'Selected:' }])
  const [pairs, setPairs] = useState<DubberCharacterPair[]>([{ dubberId: '', charactersId: '' }])
  const navigate = useNavigate()

  // fetch dubbers
  useEffect(() => {
    const fetchDubbers = async () => {
      await httpApi
        .get(TEAM)
        .then((response) => setDubbers(response.data || []))
        .catch((error) => {
          notification({ message: error.message, type: 'error' })
        })
    }
    fetchDubbers()
  }, [])

  // fetch characters
  useEffect(() => {
    const fetchCharacters = async () => {
      await httpApi
        .get(CHARACTERS)
        .then((result) => {
          setCharacters(result.data || [])
        })
        .catch((error) => {
          notification({ message: error.message, type: 'error' })
        })
    }
    fetchCharacters()
  }, [])

  useEffect(() => {
    const fetchGenres = async () => {
      await httpApi
        .get(GENRES)
        .then((result) => {
          setGenres(result.data || [])
        })
        .catch((error) => {
          notification({ message: error.message, type: 'error' })
        })
    }
    fetchGenres()
  }, [])

  // добавляем новый объект в массив
  const appendFields = () => {
    setPairs((prev) => [...prev, { dubberId: '', charactersId: '' }])
  }

  // обновляем состояние для выбранной строки
  const handlePairChange = (index: number, field: 'dubberId' | 'charactersId', value: string) => {
    const updatedPairs = [...pairs]
    updatedPairs[index][field] = value
    setPairs(updatedPairs)
  }

  const handleGenreChange = (id: number, value: string) => {
    setSelectedGenres((prevGenres) => [...prevGenres, { id, name: value }])
  }

  const removeGenre = (name: string) => {
    const genreId = selectedGenres.find((genre) => genre.name === name)?.id

    if (genreId === undefined) return
    setSelectedGenres((prevGenres) => prevGenres.filter((genre) => genre.id !== genreId))
  }

  const filterGenres = () => {
    setGenres(genres.filter((value) => !selectedGenres.some((g) => g.id === value.id)))
  }

  const submitForm = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData: Record<string, unknown> = {}

    Array.from(e.currentTarget.elements)
      .filter((element) => {
        const input = element as HTMLInputElement
        return input.name && input.value !== undefined
      })
      .forEach((element) => {
        const input = element as HTMLInputElement
        formData[input.name] = input.value
      })

    formData.dubbers = Object.values(
      pairs.reduce<Record<number, { dubberId: number; charactersId: number[] }>>(
        (acc, { dubberId, charactersId }) => {
          const dubberIdNum = Number(dubberId)
          if (!acc[dubberIdNum]) {
            acc[dubberIdNum] = { dubberId: dubberIdNum, charactersId: [] }
          }
          acc[dubberIdNum].charactersId.push(Number(charactersId))
          return acc
        },
        {},
      ),
    )

    formData.genres = selectedGenres.filter((genre) => Number(genre.id) >= 0).map((genre) => Number(genre.id))

    const sendCredentials = async () => {
      await httpApi
        .post(RELEASES, { ...formData })
        .then(() => {
          notification({ message: 'Release uploaded', type: 'success' })
          navigate('/dashboard/releases')
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
        <form className={styles.about} onSubmit={submitForm}>
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
          <div className={styles.dubber_list}>
            {pairs.map((pair, index) => (
              <div key={index} className={styles.row} id={styles.dubber_input_row}>
                <div className={styles.input_row}>
                  <div className={styles.prop}>Dubber:</div>
                  <select
                    className={styles.select_dubber}
                    value={pair.dubberId}
                    onChange={(e) => handlePairChange(index, 'dubberId', e.target.value)}
                  >
                    <option value="">-- Select dubber --</option>
                    {dubbers.map((dubber) => (
                      <option key={dubber.id} value={dubber.id}>
                        {dubber.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.description}>
                  <span>Select dubber for character.</span>
                </div>

                <div className={styles.input_row}>
                  <div className={styles.prop}>Character:</div>
                  <select
                    className={styles.select_character}
                    value={pair.charactersId}
                    onChange={(e) => handlePairChange(index, 'charactersId', e.target.value)}
                  >
                    <option value="">-- Select character --</option>
                    {characters.map((char) => (
                      <option key={char.id} value={char.id}>
                        {char.translatedName}
                      </option>
                    ))}
                  </select>
                  {index === pairs.length - 1 && (
                    <button className={styles.addButton} type="button" onClick={appendFields}>
                      +
                    </button>
                  )}
                </div>
                <div className={styles.description}>
                  <span>Select character for dubber.</span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.genres_list}>
            <div className={styles.genres_list_container}>
              <div className={styles.genres_values_container}>
                {selectedGenres.map((genre) =>
                  genre ? (
                    <div
                      key={genre.id || genre.name}
                      className={styles.genre_value}
                      onClick={() => removeGenre(genre.name)}
                    >
                      {genre.name}
                    </div>
                  ) : null,
                )}
              </div>
              <div className={styles.select_genres}>
                <span className={styles.genres_label}>Genres:</span>
                <select
                  className={styles.select_genre}
                  onChange={(e) => {
                    const selectedGenreName = e.target.value
                    const selectedGenre = genres.find((genre) => genre.name === selectedGenreName)

                    if (selectedGenre) {
                      handleGenreChange(Number(selectedGenre.id), selectedGenre.name)
                      filterGenres()
                    }
                  }}
                >
                  <option value="">-- Select genre --</option>
                  {genres.map((genre) => {
                    return (
                      <option key={genre.id} value={genre.name}>
                        {genre.name}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
          </div>
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
