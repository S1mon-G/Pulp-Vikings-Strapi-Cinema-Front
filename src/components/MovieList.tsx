import { movieService } from "../services/movieService";
import MovieCard from "./MovieCard";
import HorizontalScrollList from "./HorizontalScrollList";
import type { Movie } from "../types/movie";

export default function MovieList() {
  return (
    <HorizontalScrollList<Movie>
      title="Films"
      fetchFn={movieService.getMovies}
      renderItem={(movie, _index, isLast, ref) =>
        isLast ? (
          <MovieCard ref={ref} movie={movie} />
        ) : (
          <MovieCard movie={movie} />
        )
      }
      keyExtractor={(movie, index) => `${movie.id}-${index}`}
      itemWidth={250}
      itemsPerScroll={6}
    />
  );
}
