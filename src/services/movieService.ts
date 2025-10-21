import { api } from "./api";
import type { MoviesResponse, Movie } from "../types/movie";

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
    return api.get<MoviesResponse>("/movies/random-list", {
      "pagination[pageSize]": pageSize,
    });
  },

  getMovieById: async (id: number): Promise<Movie> => {
    return api.get<Movie>(`/movies/${id}`);
  },

  searchMovies: async (query: string): Promise<MoviesResponse> => {
    return api.get<MoviesResponse>("/movies/search", { q: query });
  },
};
