import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Details.module.css";

export default function ActorDetails() {
  const { id } = useParams<{ id: string }>();
  const [actor, setActor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActor = async () => {
      try {
        const token = localStorage.getItem("jwt_token");
        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/actors/${id}`,
          { headers }
        );
        const data = await res.json();
        setActor(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActor();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!actor) return <p>Actor not found</p>;

  return (
    <section className={`${styles.section} ${styles.actorSection}`}>
      <article className={styles.infos}>
        <h1>{actor.name}</h1>
        <h3>{actor.birth_date}</h3>
      </article>
      <div className={`${styles.thumbnail} ${styles.actorIllustration}`}>
        <img src={actor.img} alt={actor.name} />
      </div>
      <article className={styles.description}>
        <p>{actor.biography}</p>
      </article>
    </section>
  );
}
