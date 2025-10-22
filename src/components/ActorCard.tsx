import { forwardRef } from "react";
import styles from "./ActorCard.module.css";
import type { Actor } from "../types/actor";
import { Link } from "react-router-dom";

interface ActorCardProps {
  actor: Actor;
}

const ActorCard = forwardRef<HTMLDivElement, ActorCardProps>(
  ({ actor }, ref) => {
    return (
      <>
        <Link to={`/actors/${actor.documentId}`}>
          <div ref={ref} className={styles.actorCard}>
            <img
              src={actor.img ? actor.img : "./img/placeholder-actor.jpg"}
              alt={actor.name}
              className={styles.actorImage}
            />
            <div className={styles.overlay}>
              <h3 className={styles.title}>{actor.name}</h3>
            </div>
          </div>
        </Link>
      </>
    );
  }
);

ActorCard.displayName = "ActorCard";

export default ActorCard;
