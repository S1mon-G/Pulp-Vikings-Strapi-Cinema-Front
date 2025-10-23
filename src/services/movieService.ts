import { api } from "./api";
import type { MoviesResponse, Movie } from "../types/movie";
import { apiCache } from "../utils/cache";

export const movieService = {
  getMovies: async (
    page: number = 1,
    pageSize: number = 25
  ): Promise<MoviesResponse> => {
    return api.get<MoviesResponse>("/movies", {
      "pagination[page]": page,
      "pagination[pageSize]": pageSize,
    });
  },

  getRandomMovies: async (pageSize: number = 25): Promise<MoviesResponse> => {
    const cacheKey = `random-movies-${pageSize}`;
    const cached = apiCache.get<MoviesResponse>(cacheKey);
    if (cached) return cached;

    const data = await api.get<MoviesResponse>("/movies/random-list", {
      "pagination[pageSize]": pageSize,
    });
    apiCache.set(cacheKey, data);
    return data;
  },

  getMovieById: async (id: number): Promise<Movie> => {
    return api.get<Movie>(`/movies/${id}`);
  },

  getMoviesByRating: async (
    order: "asc" | "desc" = "desc",
    pageSize: number = 25
  ): Promise<MoviesResponse> => {
    const cacheKey = `movies-rating-${order}-${pageSize}`;
    const cached = apiCache.get<MoviesResponse>(cacheKey);
    if (cached) return cached;

    const data = await api.get<MoviesResponse>("/movies/by-rating", {
      order,
      "pagination[pageSize]": pageSize,
    });
    apiCache.set(cacheKey, data);
    return data;
  },

  searchMovies: async (query: string): Promise<MoviesResponse> => {
    return api.get<MoviesResponse>("/movies/search", { q: query });
  },

  getMoviesByGenre: async (
    genre: string,
    pageSize: number = 25
  ): Promise<MoviesResponse> => {
    return api.get<MoviesResponse>("/movies/by-genre", {
      genre,
      "pagination[pageSize]": pageSize,
    });
  },

  getMoviesByYear: async (
    year: number,
    pageSize: number = 25
  ): Promise<MoviesResponse> => {
    return api.get<MoviesResponse>("/movies/by-year", {
      year,
      "pagination[pageSize]": pageSize,
    });
  },

  getMoviesByGenreAndYear: async (
    genre: string,
    year: number,
    pageSize: number = 25
  ): Promise<MoviesResponse> => {
    return api.get<MoviesResponse>("/movies/by-genre-year", {
      genre,
      year,
      "pagination[pageSize]": pageSize,
    });
  },

  getLatestMovies: async (pageSize: number = 25): Promise<MoviesResponse> => {
    return api.get<MoviesResponse>("/movies/latest", {
      "pagination[pageSize]": pageSize,
    });
  },
};
