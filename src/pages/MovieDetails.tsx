import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from './Details.module.css'

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/movies/${id}`);
        const data = await res.json();
        setMovie(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>movie not found</p>;

  return (
    <section className={`${styles.section} ${styles.movieSection}`}>
      <article className={styles.infos}>
        <h1>{movie.title}</h1>
        <h2>{movie.director}</h2>
      </article >
      <article className={`${styles.thumbnail} ${styles.moviePoster}`}>
        <img src={movie.img} alt={movie.name} />
      </article>
      <article className={styles.description}>
        <p>{movie.description}</p>
      </article>

    </section>
  );
}
