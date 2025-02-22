import { type DubbersPostEntity } from 'entities/dubbers/dubbersPostEntity'

export interface ReleasePostEntity {
  originalName: string
  translatedName: string
  posterImageUrl: string
  previewVideoUrl: string
  videoUrl: string
  synopsis: string
  info: string
  dubbers: DubbersPostEntity[]
  genres: number[]
}
