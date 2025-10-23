import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Details.module.css";

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const token = localStorage.getItem("jwt_token");
        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/movies/${id}?populate=actors`,
          { headers }
        );
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
      </article>
      <article className={`${styles.thumbnail} ${styles.moviePoster}`}>
        <img src={movie.img} alt={movie.name} />
      </article>
      <article className={styles.description}>
        <p>{movie.description}</p>
        <h2>actors</h2>
        <ul className={styles.detailList}>
          {movie.actors && movie.actors.length > 0 ? (
            movie.actors.slice(0, 3).map((actor: any) => (
              <li key={movie.documentId}>
                <h3>{actor.name}</h3>
                <div className={styles.thumbnailDetail}>
                  <img src={actor.img} alt={actor.name} onClick={() => navigate(`/actors/${actor.documentId}`)} />
                </div></li>
            ))
          ) : (
            <p>No actors found for this movie.</p>
          )}
        </ul>
      </article>



    </section>
  );
}
