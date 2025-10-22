import type { StrapiResponse } from "./strapi";

export interface Movie {
  id: number;
  documentId: string;
  title: string;
  description: string;
  release_date: string;
  director: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  img: string;
  vote_average: number;
  tmdb_id: number;
}

export type MoviesResponse = StrapiResponse<Movie>;
