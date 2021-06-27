import { Router } from "express";

interface BodyId {
  id: number;
}

interface IList {
  data: Movie[];
  count?: string | number;
}

interface Controllers {
  path: string;
  router: Router;
}

interface MovieError {
  Response: string;
  Error: string;
}

interface Ratings {
  Source: string;
  Value: string;
}

interface IAddComment {
  comment: string;
  id: number;
}

interface Movie {
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
  Ratings: Ratings[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  totalSeasons: string;
  Response: string;
  dvd?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  comment?: string;
  Error?: string;
}

export { Controllers, Movie, IAddComment, BodyId, IList, MovieError };
