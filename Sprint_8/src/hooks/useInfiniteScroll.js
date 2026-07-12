import { useEffect, useRef } from 'react';

export function useInfiniteScroll({ onIntersect, enabled, isLoading }) {
  const sentinelRef = useRef(null);
  const onIntersectRef = useRef(onIntersect);
  const isLoadingRef = useRef(isLoading);
  useEffect(() => {
    onIntersectRef.current = onIntersect;
  }, [onIntersect]);

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    const sentinelNode = sentinelRef.current;

    if (!enabled || !sentinelNode) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoadingRef.current) {
          onIntersectRef.current?.();
        }
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0,
      }
    );

    observer.observe(sentinelNode);

    return () => {
      observer.unobserve(sentinelNode);
      observer.disconnect();
    };
  }, [enabled]);

  return sentinelRef;
}