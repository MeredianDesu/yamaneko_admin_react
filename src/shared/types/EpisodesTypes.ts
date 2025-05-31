import { type EpisodeQualityType } from './EpisodeQualityTypes'

export interface EpisodesType {
  episodeNumber: number | string
  episodeName: string
  qualities: EpisodeQualityType[]
}
