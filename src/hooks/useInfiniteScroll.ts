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
  const [isRefreshing, setIsRefreshing] = useState(false);
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

  // Et ici c'est pour charger avant d'arriver au bout de la liste
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
          rootMargin: "0px 200px 0px 0px", // <== augmenter si besoin !!!
          threshold: 0.1,
        }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMoreItems, scrollContainerRef]
  );

  // Evite un flicker (prévention contre l'épillepsie on est des gens sympa)
  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    setError(null);

    try {
      const data = await fetchFn(pageSize);
      setItems(data.data);
      setHasMore(data.data.length > 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsRefreshing(false);
    }
  }, [fetchFn, pageSize]);

  useEffect(() => {
    loadMoreItems();
  }, []);

  return {
    items,
    loading,
    isRefreshing,
    error,
    hasMore,
    lastItemRef,
    refresh,
  };
};
