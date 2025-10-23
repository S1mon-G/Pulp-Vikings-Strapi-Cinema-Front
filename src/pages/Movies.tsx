import { useState, useMemo } from "react";
import { movieService } from "../services/movieService";
import MovieCard from "../components/MovieCard";
import HorizontalScrollList from "../components/HorizontalScrollList";
import MovieSidebar from "../components/MovieSidebar";
import type { Movie } from "../types/movie";
import styles from "./Movies.module.css";

type FilterType = "random" | "rating-asc" | "rating-desc";

export default function Movies() {
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
    <div className={styles.moviesPage}>
      <div className={styles.pageHeader}>
        <h1>🎬 Tous les Films</h1>
        <p>Découvrez notre collection complète de films</p>
      </div>

      <div className={styles.layout}>
        {/* Sidebar */}
        <MovieSidebar />

        {/* Contenu principal */}
        <div className={styles.mainContent}>
          <div className={styles.movieListWrapper}>
            <div className={styles.header}>
              <h2>Films</h2>
              <div className={styles.filterControls}>
                Classement par vote :{" "}
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
              keyExtractor={(movie, index) => `${movie.id}-${index}`}
              itemWidth={250}
              itemsPerScroll={6}
              pageSize={25}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
