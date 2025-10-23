import { forwardRef, memo } from "react";
import styles from "./MovieCard.module.css";
import type { Movie } from "../types/movie";
import { Link } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
}

const getVoteColor = (vote: number): string => {
  // Si la note est 0, retourner gris/noir
  if (vote === 0 || vote === null) {
    return "#555555";
  }

  const normalizedVote = Math.min(Math.max(vote / 10, 0), 1);

  const red = Math.round(255 * (1 - normalizedVote));
  const green = Math.round(255 * normalizedVote);

  return `rgb(${red}, ${green}, 0)`;
};

const MovieCard = forwardRef<HTMLDivElement, MovieCardProps>(
  ({ movie }, ref) => {
    return (
      <>
        <Link to={`/movies/${movie.id}`}>
          <div ref={ref} className={styles.movieCard}>
            <img
              src={movie.img}
              alt={movie.title}
              className={styles.movieImage}
              loading="lazy"
            />
            <div className={styles.overlay}>
              <h3 className={styles.title}>{movie.title}</h3>
            </div>
            <div
              className={styles.voteAverage}
              style={{ backgroundColor: getVoteColor(movie.vote_average) }}
            >
              {movie.vote_average === 0 || movie.vote_average === null
                ? "N/A"
                : movie.vote_average % 1 === 0
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

export default memo(MovieCard);
