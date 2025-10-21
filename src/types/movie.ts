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

export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export type MoviesResponse = StrapiResponse<Movie>;
