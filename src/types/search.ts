export interface Movie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface Rating {
  Source: string;
  Value: string;
}

export interface MovieListResponse {
  Search: MovieList[];
  totalResults: string;
  Response: string;
}

export interface MovieList {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface SearchParam {
  title: string;
  page: number;
  type?: SearchType;
  year?: number | string;
}

export interface SearchState extends SearchParam {
  loading: boolean;
  data: MovieListResponse;
  viewType: ViewType;
}

export type SearchType = "movie" | "series" | "episode";
export type ViewType = "list" | "table";
