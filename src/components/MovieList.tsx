import { useState, useMemo } from "react";
import { movieService } from "../services/movieService";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";
import HorizontalScrollList from "./HorizontalScrollList";
import type { Movie } from "../types/movie";
import styles from "./MovieList.module.css";

type FilterType = "random" | "rating-asc" | "rating-desc";

export default function MovieList() {
  const [filter, setFilter] = useState<FilterType>("random");

  const fetchFunction = useMemo(() => {
    switch (filter) {
      case "rating-asc":
        return (pageSize?: number) =>
          movieService.getMoviesByRating("asc", pageSize);
      case "rating-desc":
        return (pageSize?: number) =>
          movieService.getMoviesByRating("desc", pageSize);
      case "random":
      default:
        return movieService.getRandomMovies;
    }
  }, [filter]);

  return (
    <div className={styles.movieListWrapper}>
      <div className={styles.header}>
        <h2>Films</h2>
        <div className={styles.filterControls}>
          <p className={styles.filterLabel}>Classement par vote : </p>
          <button
            onClick={() => setFilter("random")}
            className={filter === "random" ? styles.active : ""}
          >
            🎲
          </button>
          <button
            onClick={() => setFilter("rating-desc")}
            className={filter === "rating-desc" ? styles.active : ""}
          >
            <img
              src="public/img/greenarrow.png"
              alt="Up Green Arrow"
              className={styles.greenArrow}
            />
          </button>
          <button
            onClick={() => setFilter("rating-asc")}
            className={filter === "rating-asc" ? styles.active : ""}
          >
            <img
              src="public/img/redarrow.png"
              alt="Up Red Arrow"
              className={styles.redArrow}
            />
          </button>
        </div>
      </div>

      <HorizontalScrollList<Movie>
        fetchFn={fetchFunction}
        renderItem={(movie, _index, isLast, ref) =>
          isLast ? (
            <MovieCard ref={ref} movie={movie} />
          ) : (
            <MovieCard movie={movie} />
          )
        }
        renderSkeleton={() => <MovieCardSkeleton />}
        keyExtractor={(movie, index) => `${movie.id}-${index}`}
        itemWidth={250}
        itemsPerScroll={6}
        pageSize={25}
      />
    </div>
  );
}
