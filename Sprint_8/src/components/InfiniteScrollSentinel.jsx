import { forwardRef } from 'react';

const InfiniteScrollSentinel = forwardRef(function InfiniteScrollSentinel(
  { isLoadingMore },
  ref
) {
  return (
    <div
      ref={ref}
      className="infinite-scroll-sentinel"
      aria-hidden="true"
      data-loading-more={isLoadingMore ? 'true' : 'false'}
    />
  );
});

export default InfiniteScrollSentinel;