import styles from "./MovieList.module.css";
import { useRef } from "react";
import { movieService } from "../services/movieService";
import MovieCard from "./MovieCard";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";
import { useInfiniteRandomScroll } from "../hooks/useInfiniteRandomScroll";

export default function MovieList() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useHorizontalScroll(scrollContainerRef);

  const {
    items: movies,
    loading,
    error,
    hasMore,
    lastItemRef,
  } = useInfiniteRandomScroll({
    fetchFn: movieService.getMovies,
    scrollContainerRef,
  });

  if (error) {
    return <div className={styles.movieList}>Erreur : {error}</div>;
  }

  return (
    <div className={styles.movieList}>
      <h2>Films</h2>
      <div className={styles.scrollContainer} ref={scrollContainerRef}>
        {movies.map((movie, index) => {
          if (movies.length === index + 1) {
            return (
              <MovieCard
                key={`${movie.id}-${index}`}
                ref={lastItemRef}
                movie={movie}
              />
            );
          } else {
            return <MovieCard key={`${movie.id}-${index}`} movie={movie} />;
          }
        })}
        {loading && <div className={styles.loading}>Chargement...</div>}
        {!hasMore && <div className={styles.end}>Fin</div>}
      </div>
    </div>
  );
}
