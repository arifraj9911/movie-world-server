// Top Cast Interface
export interface ITopCast {
  image: string;
  name: string;
  role: string;
  episode: number;
  year: number;
}

// Movie Interface
export interface IMovie {
  id?: string;
  title: string;
  poster: string;
  description: string;
  creators: string[];
  stars: string[];
  genre?: string[];
  releaseYear: number;
  episodes: number;
  videos: number;
  photos: number;
  rating: number;
  ratingCount: number;
  language: string;
  country?: string;
  duration?: string;
  youtubeUrl: string;
  topCast: ITopCast[];
  tags?: string[];
  isWatched: boolean;
}
