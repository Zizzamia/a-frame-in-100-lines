export interface SegmentProps {
  URL: string[];
  bullets: string[];
  bullets_ELI5: string[];
  complete_transcript: string;
  end_time_ms: number;
  headline: string;
  headline_ELI5: string;
  segment_length_ms: number;
  segment_number: number;
  start_time_ms: number;
  story: string;
  summary: string;
  summary_ELI5: string;
  timestamp: string;
  segment_title: string;
  tweet_embed?: string[];
  keywords?: string[];
}

export interface EpisodeProps {
  episode_data: SegmentProps[];
  episode_date: number;
  episode_day: number;
  episode_day_of_week: number;
  episode_keywords: string[];
  episode_month: number;
  episode_number: number;
  episode_title: string;
  episode_title_generated: string;
  episode_year: number;
  full_item_url: string;
  item_body: string;
  item_title: string;
  release_date: string;
  youtube_url: string;
  _id: string;
  matchedSegmentNumbers: number[];
}

export interface EpisodeContextType {
  data: EpisodeProps[];
  setData: (data: EpisodeProps[]) => void;
}

export interface AppState {
  isVideoModalOpen: boolean;
  searchResultEpisodes: EpisodeProps[] | null;
  latestEpisodes: EpisodeProps[] | null;
  currentEpisode: EpisodeProps | null;
  currentSegment: SegmentProps | null;
  currentYouTubeVideo: string | null;
  hasSearched: boolean;
  isMenuModalOpen: boolean;
}

export interface YouTubePlayerEvent {
  target: {
    playVideo: () => void;
  };
}
