import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type RefObject,
} from "react";
import type { StrapiResponse } from "../types/strapi";

interface UseInfiniteScrollProps<T> {
  fetchFn: (pageSize?: number) => Promise<StrapiResponse<T>>;
  scrollContainerRef: RefObject<HTMLDivElement>;
  pageSize?: number;
}

export const useInfiniteScroll = <T>({
  fetchFn,
  scrollContainerRef,
  pageSize = 25,
}: UseInfiniteScrollProps<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const loadMoreItems = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchFn(pageSize);

      if (data.data.length === 0) {
        setHasMore(false);
      } else {
        setItems((prev) => [...prev, ...data.data]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }, [fetchFn, pageSize, loading, hasMore]);

  // Intersection Observer pour détecter quand on arrive au dernier élément
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            loadMoreItems();
          }
        },
        {
          root: scrollContainerRef.current,
          rootMargin: "0px 200px 0px 0px", // Charger un peu avant d'arriver au bout
          threshold: 0.1,
        }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMoreItems, scrollContainerRef]
  );

  // Charger les premiers items au montage
  useEffect(() => {
    loadMoreItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    items,
    loading,
    error,
    hasMore,
    lastItemRef,
  };
};
