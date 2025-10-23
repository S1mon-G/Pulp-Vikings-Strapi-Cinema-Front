import type { Actor } from "../types/actor";
import styles from "./ModalActorCard.module.css";

interface ModalActorCardProps {
  actor: Actor | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalActorCard({ actor, isOpen, onClose }: ModalActorCardProps) {
  console.log("ModalActorCard props:", { actor, isOpen });
  if (!isOpen || !actor) return null;

  const getPopularityEmoji = (popularity: number): string => {
    if (popularity >= 10) return "★★★★★";
    if (popularity >= 5) return "☆★★★★";
    if (popularity >= 3) return "☆☆★★★";
    if (popularity >= 2) return "☆☆☆★★";
    if (popularity >= 0.5) return "☆☆☆☆★";
    return "☆☆☆☆☆";
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        
        <div className={styles.actorDetails}>
          <div className={styles.actorImage}>
            <img
              src={actor.img || "./img/placeholder-actor.jpg"}
              alt={actor.name}
              className={styles.photo}
            />
          </div>
          
          <div className={styles.actorInfo}>
            <h2 className={styles.actorName}>{actor.name}</h2>
            
            <div className={styles.actorStats}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Popularité</span>
                <span className={styles.statValue}>
                  {getPopularityEmoji(actor.popularity)}
                </span>
              </div>
              
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Date de naissance</span>
                <span className={styles.statValue}>
                  {new Date(actor.birth_date).toLocaleDateString('fr-FR')}
                </span>
              </div>
              
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Âge</span>
                <span className={styles.statValue}>
                  {new Date().getFullYear() - new Date(actor.birth_date).getFullYear()} ans
                </span>
              </div>
            </div>
            
            <div className={styles.description}>
              <h3>À propos</h3>
              <p>
                {actor.name} est un acteur talentueux avec une popularité de {actor.popularity.toFixed(1)}.
                Né le {new Date(actor.birth_date).toLocaleDateString('fr-FR')}, 
                il a su se faire une place dans l'industrie du cinéma.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
