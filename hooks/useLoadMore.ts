import { useEffect, useRef } from "react";

export const useLoadMore = (
  loadMoreData: () => void,
  hasMoreData: boolean | undefined,
  isLoading: boolean,
  isError: boolean
) => {
  const ref = useRef(null);

  useEffect(() => {
    const callbackFn = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];

      if (!entry.isIntersecting) return;

      if (!isLoading && hasMoreData && !isError) {
        loadMoreData();
      }
    };
    const observer = new IntersectionObserver(callbackFn, {
      root: null,
      rootMargin: "270px",
      threshold: 0.1,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasMoreData, isError, isLoading, loadMoreData]);

  return { ref };
};
