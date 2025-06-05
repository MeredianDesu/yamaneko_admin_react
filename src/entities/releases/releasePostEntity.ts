import { type DubbersPostEntity } from 'entities/dubbers/dubbersPostEntity'

export interface ReleasePostEntity {
  originalName: string
  translatedName: string
  ageRestriction: number | string
  maxEpisodes: number | string
  posterImageUrl: string
  previewVideoUrl: string
  videoUrl: string
  synopsis: string
  status: string
  info: string
  dubbers: DubbersPostEntity[]
  genres: number[]
}
