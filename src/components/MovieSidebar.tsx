import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { movieService } from "../services/movieService";
import type { Movie } from "../types/movie";
import styles from "./MovieSidebar.module.css";

export default function MovieSidebar() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await movieService.getMoviesByRating("desc", 10);
        setMovies(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des films:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className={styles.sidebar}>
        <h3>📽️ Films populaires</h3>
        <div className={styles.loading}>Chargement...</div>
      </div>
    );
  }

  return (
    <div className={styles.sidebar}>
      <h3>📽️ Films populaires</h3>
      <div className={styles.movieList}>
        {movies.map((movie) => (
          <div 
            key={movie.id} 
            className={styles.movieItem}
            onClick={() => navigate(`/movies/${movie.documentId}`)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={movie.img}
              alt={movie.title}
              className={styles.movieImage}
            />
            <div className={styles.movieInfo}>
              <h4 className={styles.movieTitle}>{movie.title}</h4>
              <p className={styles.movieYear}>
                {new Date(movie.release_date).getFullYear()}
              </p>
              <div className={styles.movieRating}>
                ⭐ {movie.vote_average.toFixed(1)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}