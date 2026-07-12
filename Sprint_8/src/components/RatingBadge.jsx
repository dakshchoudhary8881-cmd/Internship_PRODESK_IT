import { memo } from 'react';

function RatingBadge({ rating }) {
  if (rating === null || rating === undefined || typeof rating !== 'number' || Number.isNaN(rating)) {
    return (
      <span className="rating-badge rating-badge-unrated">N/A</span>
    );
  }

  return (
    <span className="rating-badge" aria-label={`Rating ${rating.toFixed(1)} out of 10`}>
      {rating.toFixed(1)}
    </span>
  );
}

export default memo(RatingBadge);