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
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef(false); // Évite les re-rendus inutiles
  const hasMoreRef = useRef(true);

  // Fonction de chargement sans dépendances circulaires
  const loadMoreItems = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;

    loadingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const data = await fetchFn(pageSize);

      if (data.data.length === 0) {
        setHasMore(false);
        hasMoreRef.current = false;
      } else {
        setItems((prev) => [...prev, ...data.data]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [fetchFn, pageSize]);

  // Intersection Observer pour le scroll infini
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loadingRef.current) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMoreRef.current) {
            loadMoreItems();
          }
        },
        {
          root: scrollContainerRef.current,
          rootMargin: "0px 200px 0px 0px",
          threshold: 0.1,
        }
      );

      if (node) observer.current.observe(node);
    },
    [loadMoreItems, scrollContainerRef]
  );

  // Rafraîchissement sans skeleton (avec overlay)
  const refresh = useCallback(async () => {
    if (loadingRef.current) return;

    loadingRef.current = true;
    setIsRefreshing(true);
    setError(null);

    try {
      const data = await fetchFn(pageSize);
      setItems(data.data);
      setHasMore(data.data.length > 0);
      hasMoreRef.current = data.data.length > 0;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsRefreshing(false);
      loadingRef.current = false;
    }
  }, [fetchFn, pageSize]);

  // Réinitialisation complète (avec skeletons)
  const reset = useCallback(async () => {
    if (loadingRef.current) return;

    loadingRef.current = true;
    setItems([]);
    setHasMore(true);
    hasMoreRef.current = true;
    setError(null);
    setLoading(true);

    try {
      const data = await fetchFn(pageSize);
      setItems(data.data);
      setHasMore(data.data.length > 0);
      hasMoreRef.current = data.data.length > 0;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [fetchFn, pageSize]);

  // Chargement initial
  useEffect(() => {
    loadMoreItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cleanup de l'observer au démontage
  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return {
    items,
    loading,
    isRefreshing,
    error,
    hasMore,
    lastItemRef,
    refresh,
    reset,
  };
};
