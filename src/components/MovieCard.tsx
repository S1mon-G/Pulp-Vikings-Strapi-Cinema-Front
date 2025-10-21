import { forwardRef } from "react";
import styles from "./MovieCard.module.css";
import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = forwardRef<HTMLDivElement, MovieCardProps>(
  ({ movie }, ref) => {
    return (
      <>
        <a
          href={`/movies/${movie.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div ref={ref} className={styles.movieCard}>
            <img
              src={movie.img}
              alt={movie.title}
              className={styles.movieImage}
            />
            <div className={styles.overlay}>
              <h3 className={styles.title}>{movie.title}</h3>
            </div>
            <div className={styles.voteAverage}>
              {Math.round(movie.vote_average)}/10
            </div>
          </div>
        </a>
      </>
    );
  }
);

MovieCard.displayName = "MovieCard";

export default MovieCard;
