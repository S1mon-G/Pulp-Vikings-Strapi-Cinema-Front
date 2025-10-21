import { actorService } from "../services/actorService";
import ActorCard from "./ActorCard";
import HorizontalScrollList from "./HorizontalScrollList";
import type { Actor } from "../types/actor";
import styles from "./ActorList.module.css";

export default function ActorList() {
  return (
    <div className={styles.actorListWrapper}>
      <h2 className={styles.title}>Acteurs</h2>
      <HorizontalScrollList<Actor>
        fetchFn={actorService.getRandomActors}
        renderItem={(actor, _index, isLast, ref) =>
          isLast ? (
            <ActorCard ref={ref} actor={actor} />
          ) : (
            <ActorCard actor={actor} />
          )
        }
        keyExtractor={(actor, index) => `${actor.id}-${index}`}
        itemWidth={250}
        itemsPerScroll={6}
        pageSize={25}
      />
    </div>
  );
}
