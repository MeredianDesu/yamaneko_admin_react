import { type DubbersType } from './DubbersType'
import { type GenresType } from './GenresTypes'

export type ReleaseType = {
  id: number
  originalName: string
  translatedName: string
  posterImageUrl: string
  previewVideoUrl: string
  videoUrl: string
  synopsis: string
  info: string
  dubbers: DubbersType[]
  genres: GenresType[]
  uploadedAt: string

  // Временные переменные, в них должны приходить ответы с сервера
  status?: string
  updated?: string
}
