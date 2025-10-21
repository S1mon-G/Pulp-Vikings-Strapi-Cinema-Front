import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type RefObject,
} from "react";
import { shuffleArray, getRandomNumber } from "../utils/arrayHelpers";
import { PAGINATION_CONFIG } from "../constants/pagination";
import type { StrapiResponse } from "../types/strapi";

interface UseInfiniteRandomScrollProps<T> {
  fetchFn: (page: number, pageSize?: number) => Promise<StrapiResponse<T>>;
  scrollContainerRef: RefObject<HTMLDivElement>;
}

export const useInfiniteRandomScroll = <T>({
  fetchFn,
  scrollContainerRef,
}: UseInfiniteRandomScrollProps<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const loadedPages = useRef<Set<number>>(new Set());
  const observer = useRef<IntersectionObserver | null>(null);

  const loadRandomItems = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      if (totalPages === null) {
        const firstPage = await fetchFn(1);
        setTotalPages(firstPage.meta.pagination.pageCount);

        const shuffledItems = shuffleArray(firstPage.data);
        setItems(shuffledItems);
        loadedPages.current.add(1);
        setLoading(false);
        return;
      }

      let randomPage: number;
      let attempts = 0;
      do {
        randomPage = getRandomNumber(1, totalPages);
        attempts++;
      } while (
        loadedPages.current.has(randomPage) &&
        attempts < PAGINATION_CONFIG.MAX_ATTEMPTS
      );

      if (
        attempts >= PAGINATION_CONFIG.MAX_ATTEMPTS ||
        loadedPages.current.size >= totalPages
      ) {
        setHasMore(false);
        return;
      }

      loadedPages.current.add(randomPage);

      const response = await fetchFn(randomPage);
      const shuffledItems = shuffleArray(response.data);

      setItems((prev) => [...prev, ...shuffledItems]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, totalPages, fetchFn]);

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            loadRandomItems();
          }
        },
        {
          root: scrollContainerRef.current,
          rootMargin: PAGINATION_CONFIG.ROOT_MARGIN,
          threshold: PAGINATION_CONFIG.THRESHOLD,
        }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, scrollContainerRef, loadRandomItems]
  );

  useEffect(() => {
    loadRandomItems();
  }, []);

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return { items, loading, error, hasMore, lastItemRef };
};
