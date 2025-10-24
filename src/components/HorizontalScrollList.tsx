import { useRef, useState, useEffect, type ReactNode } from "react";
import styles from "./HorizontalScrollList.module.css";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import type { StrapiResponse } from "../types/strapi";

interface HorizontalScrollListProps<T> {
  fetchFn: (pageSize?: number) => Promise<StrapiResponse<T>>;
  renderItem: (
    item: T,
    index: number,
    isLast: boolean,
    ref?: React.Ref<HTMLDivElement>
  ) => ReactNode;
  keyExtractor: (item: T, index: number) => string;
  itemWidth?: number;
  itemsPerScroll?: number;
  pageSize?: number;
  renderSkeleton: () => ReactNode;
}

export default function HorizontalScrollList<T>({
  fetchFn,
  renderItem,
  keyExtractor,
  itemWidth = 250,
  itemsPerScroll = 6,
  pageSize = 25,
  renderSkeleton,
}: HorizontalScrollListProps<T>) {
  const scrollContainerRef = useRef<HTMLDivElement>(null!);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useHorizontalScroll(scrollContainerRef);

  const { items, loading, isRefreshing, error, hasMore, lastItemRef, reset } =
    useInfiniteScroll({
      fetchFn,
      scrollContainerRef,
      pageSize,
    });

  useEffect(() => {
    // Réinitialiser complètement lors du changement de fetchFn
    reset();
  }, [fetchFn, reset]);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();

      return () => container.removeEventListener("scroll", checkScrollPosition);
    }
  }, [items]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const gap = 24;
      const scrollAmount = (itemWidth + gap) * itemsPerScroll;

      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const gap = 24;
      const scrollAmount = (itemWidth + gap) * itemsPerScroll;

      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (error) {
    return <div className={styles.scrollList}>Erreur : {error}</div>;
  }

  return (
    <div className={styles.scrollWrapper}>
      {isRefreshing && (
        <div className={styles.refreshOverlay}>
          <div className={styles.refreshSpinner}>Chargement...</div>
        </div>
      )}

      <button
        onClick={scrollLeft}
        disabled={!canScrollLeft}
        className={`${styles.navBtn} ${styles.navBtnLeft}`}
        aria-label="Scroller vers la gauche"
      >
        ←
      </button>
      <button
        onClick={scrollRight}
        disabled={!canScrollRight}
        className={`${styles.navBtn} ${styles.navBtnRight}`}
        aria-label="Scroller vers la droite"
      >
        →
      </button>
      <div className={styles.scrollContainer} ref={scrollContainerRef}>
        {items.length === 0 && loading ? (
          // Afficher les skeletons pendant le chargement initial
          Array.from({ length: 8 }).map((_, index) => (
            <div key={`skeleton-${index}`}>{renderSkeleton()}</div>
          ))
        ) : (
          <>
            {items.map((item, index) => {
              const isLast = items.length === index + 1;
              return (
                <div key={keyExtractor(item, index)}>
                  {renderItem(
                    item,
                    index,
                    isLast,
                    isLast ? lastItemRef : undefined
                  )}
                </div>
              );
            })}
            {loading &&
              // Afficher quelques skeletons lors du chargement de plus d'items
              Array.from({ length: 4 }).map((_, index) => (
                <div key={`loading-skeleton-${index}`}>{renderSkeleton()}</div>
              ))}
            {!hasMore && <div className={styles.end}>Fin</div>}
          </>
        )}
      </div>
    </div>
  );
}
