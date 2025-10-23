import { forwardRef } from "react";
import styles from "./ActorCard.module.css";
import type { Actor } from "../types/actor";
import { Link } from "react-router-dom";

interface ActorCardProps {
  actor: Actor;
  onActorClick?: (actor: Actor) => void;
}

const getPopularityEmoji = (popularity: number): string => {
  if (popularity >= 10) return "★★★★★";
  if (popularity >= 5) return "☆★★★★";
  if (popularity >= 3) return "☆☆★★★";
  if (popularity >= 2) return "☆☆☆★★";
  if (popularity >= 0.5) return "☆☆☆☆★";
  return "☆☆☆☆☆";
};

const ActorCard = forwardRef<HTMLDivElement, ActorCardProps>(
  ({ actor, onActorClick }, ref) => {
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (onActorClick) {
        onActorClick(actor);
      }
    };

    return (
      <div 
        ref={ref} 
        className={styles.actorCard}
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        <img
          src={actor.img ? actor.img : "./img/placeholder-actor.jpg"}
          alt={actor.name}
          className={styles.actorImage}
        />
        <div className={styles.overlay}>
          <h3 className={styles.title}>{actor.name}</h3>
          <div className={styles.actorInfo}>
            <span className={styles.birthYear}>
              {new Date(actor.birth_date).getFullYear()}
            </span>
          </div>
        </div>
        <div className={styles.popularity}>
          {getPopularityEmoji(actor.popularity)}
        </div>
      </div>
    );
  }
);

ActorCard.displayName = "ActorCard";

export default ActorCard;
