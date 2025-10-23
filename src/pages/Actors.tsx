import { useState, useMemo } from "react";
import { actorService } from "../services/actorService";
import ActorCard from "../components/ActorCard";
import ActorModal from "../components/ActorModal";
import HorizontalScrollList from "../components/HorizontalScrollList";
import type { Actor } from "../types/actor";
import styles from "./Actors.module.css";

type FilterType = "random" | "popularity-asc" | "popularity-desc";

export default function Actors() {
  const [filter, setFilter] = useState<FilterType>("random");
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleActorClick = (actor: Actor) => {
    setSelectedActor(actor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedActor(null);
  };

  const fetchFunction = useMemo(() => {
    switch (filter) {
      case "popularity-asc":
        return (pageSize?: number) =>
          actorService.getActorsByPopularity("asc", pageSize);
      case "popularity-desc":
        return (pageSize?: number) =>
          actorService.getActorsByPopularity("desc", pageSize);
      case "random":
      default:
        return actorService.getRandomActors;
    }
  }, [filter]);

  return (
    <div className={styles.actorsPage}>
      <div className={styles.pageHeader}>
        <h1>🎭 Tous les Acteurs</h1>
        <p>Découvrez notre collection complète d'acteurs</p>
      </div>

      <div className={styles.layout}>
        {/* Contenu principal */}
        <div className={styles.mainContent}>
          <div className={styles.actorListWrapper}>
            <div className={styles.header}>
              <h2>Acteurs</h2>
              <div className={styles.filterControls}>
                Classement par popularité :{" "}
                <button
                  onClick={() => setFilter("random")}
                  className={filter === "random" ? styles.active : ""}
                  title="Aléatoire"
                >
                  🎲
                </button>
                <button
                  onClick={() => setFilter("popularity-desc")}
                  className={filter === "popularity-desc" ? styles.active : ""}
                  title="Plus populaires"
                >
                  <img
                    src="public/img/greenarrow.png"
                    alt="Up Green Arrow"
                    className={styles.greenArrow}
                  />
                </button>
                <button
                  onClick={() => setFilter("popularity-asc")}
                  className={filter === "popularity-asc" ? styles.active : ""}
                  title="Moins populaires"
                >
                  <img
                    src="public/img/redarrow.png"
                    alt="Down Red Arrow"
                    className={styles.redArrow}
                  />
                </button>
              </div>
            </div>

            <HorizontalScrollList<Actor>
              fetchFn={fetchFunction}
              renderItem={(actor, _index, isLast, ref) =>
                isLast ? (
                  <ActorCard ref={ref} actor={actor} onActorClick={handleActorClick} />
                ) : (
                  <ActorCard actor={actor} onActorClick={handleActorClick} />
                )
              }
              keyExtractor={(actor, index) => `${actor.id}-${index}`}
              itemWidth={200}
              itemsPerScroll={8}
              pageSize={25}
            />
          </div>
        </div>
      </div>

      {/* Modal pour les détails de l'acteur */}
      <ActorModal
        actor={selectedActor}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
