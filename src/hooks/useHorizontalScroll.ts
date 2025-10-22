import { useEffect, type RefObject } from "react";

export const useHorizontalScroll = (ref: RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const scrollContainer = ref.current;
    if (!scrollContainer) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollContainer.scrollLeft += e.deltaY;
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
    };
  }, [ref]);
};
