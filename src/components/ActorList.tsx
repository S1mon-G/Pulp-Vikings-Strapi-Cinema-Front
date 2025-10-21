import { actorService } from "../services/actorService";
import ActorCard from "./ActorCard";
import HorizontalScrollList from "./HorizontalScrollList";
import type { Actor } from "../types/actor";

export default function ActorList() {
  return (
    <HorizontalScrollList<Actor>
      title="Acteurs"
      fetchFn={actorService.getActors}
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
    />
  );
}
