import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Drives "infinite scroll" pagination over an in-memory array.
 * Exposes a sentinel ref to attach to the bottom of a scroll container;
 * when it intersects the viewport, the next page of `pageSize` rows is revealed.
 */
export default function useInfiniteScroll(items, pageSize = 25) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [prevItems, setPrevItems] = useState(items);
  const sentinelRef = useRef(null);
  const observerRef = useRef(null);

  // Reset pagination whenever the underlying (filtered) item set changes.
  // Done during render (React's documented "adjust state on prop change"
  // pattern) rather than in an effect, to avoid an extra render pass.
  if (prevItems !== items) {
    setPrevItems(items);
    setVisibleCount(pageSize);
  }

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + pageSize, items.length));
  }, [items.length, pageSize]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return undefined;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { root: null, rootMargin: '200px', threshold: 0 }
    );

    observerRef.current.observe(node);
    return () => observerRef.current && observerRef.current.disconnect();
  }, [loadMore]);

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return { visibleItems, sentinelRef, hasMore, loadMore };
}
