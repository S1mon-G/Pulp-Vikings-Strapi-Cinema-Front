import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ActorDetails() {
  const { id } = useParams<{ id: string }>();
  const [actor, setActor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActor = async () => {
      try {
        const res = await fetch(`http://localhost:1337/api/actors/${id}`);
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
    <div>
      <h1>{actor.name}</h1>
      <img src={actor.img} alt={actor.name} />
      <p>{actor.description}</p>
    </div>
  );
}
