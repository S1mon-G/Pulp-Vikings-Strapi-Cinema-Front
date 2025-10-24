import { useState, useMemo } from "react";
import { actorService } from "../services/actorService";
import ActorCard from "./ActorCard";
import ActorCardSkeleton from "./ActorCardSkeleton";
import HorizontalScrollList from "./HorizontalScrollList";
import type { Actor } from "../types/actor";
import styles from "./ActorList.module.css";

type FilterType = "random" | "rating-asc" | "rating-desc";

export default function ActorList() {
  const [filter, setFilter] = useState<FilterType>("random");

  const fetchFunction = useMemo(() => {
    switch (filter) {
      case "rating-asc":
        return (pageSize?: number) =>
          actorService.getActorsByPopularity("asc", pageSize);
      case "rating-desc":
        return (pageSize?: number) =>
          actorService.getActorsByPopularity("desc", pageSize);
      case "random":
      default:
        return actorService.getRandomActors;
    }
  }, [filter]);

  return (
    <div className={styles.actorListWrapper}>
      <div className={styles.header}>
        <h2>Acteurs</h2>
        <div className={styles.filterControls}>
          <p className={styles.filterLabel}>Classement par popularité : </p>
          <button
            onClick={() => setFilter("random")}
            className={filter === "random" ? styles.active : ""}
          >
            🎲
          </button>
          <button
            onClick={() => setFilter("rating-desc")}
            className={filter === "rating-desc" ? styles.active : ""}
          >
            <img
              src="public/img/greenarrow.png"
              alt="Up Green Arrow"
              className={styles.greenArrow}
            />
          </button>
          <button
            onClick={() => setFilter("rating-asc")}
            className={filter === "rating-asc" ? styles.active : ""}
          >
            <img
              src="public/img/redarrow.png"
              alt="Up Red Arrow"
              className={styles.redArrow}
            />
          </button>
        </div>
      </div>

      <HorizontalScrollList<Actor>
        fetchFn={fetchFunction}
        renderItem={(actor, _index, isLast, ref) =>
          isLast ? (
            <ActorCard ref={ref} actor={actor} />
          ) : (
            <ActorCard actor={actor} />
          )
        }
        renderSkeleton={() => <ActorCardSkeleton />}
        keyExtractor={(actor, index) => `${actor.id}-${index}`}
        itemWidth={250}
        itemsPerScroll={6}
        pageSize={25}
      />
    </div>
  );
}
