import { forwardRef } from "react";
import styles from "./MovieCard.module.css";
import type { Movie } from "../types/movie";
import { Link } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = forwardRef<HTMLDivElement, MovieCardProps>(
  ({ movie }, ref) => {
    return (
      <>
        <Link to={`/movies/${movie.documentId}`}>
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
              {movie.vote_average % 1 === 0
                ? movie.vote_average
                : movie.vote_average.toFixed(1)}
            </div>
          </div>
        </Link>
      </>
    );
  }
);

MovieCard.displayName = "MovieCard";

export default MovieCard;
