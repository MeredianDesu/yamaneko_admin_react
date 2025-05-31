import { type DubbersType } from './DubbersType'
import { type EpisodesType } from './EpisodesTypes'
import { type GenresType } from './GenresTypes'

export interface ReleaseType {
  id: string | number
  originalName: string
  translatedName: string
  ageRestriction: string
  maxEpisodes: string
  status: string
  posterImageUrl: string
  previewVideoUrl: string

  episodes?: EpisodesType[]

  videoUrl: string
  synopsis: string
  info: string
  dubbers: DubbersType[]
  genres: GenresType[]

  updatedAt: string
  uploadedAt: string
}
