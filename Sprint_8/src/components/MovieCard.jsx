import { useState, memo } from 'react';
import RatingBadge from './RatingBadge';
import FavoriteButton from './FavoriteButton';

function MovieCard({ movie, onSelectMovie }) {
  const [imgError, setImgError] = useState(false);

  if (!movie) return null;
  const { title, posterUrl, releaseYear, rating } = movie;


  return (
    <article
      className="cf-card"
      onClick={() => onSelectMovie?.(movie)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectMovie?.(movie);
        }
      }}
    >
      <div className="cf-card__poster">
        {posterUrl && !imgError ? (
          <img
            className="cf-card__img"
            src={posterUrl}
            alt={`${title} poster`}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="cf-card__poster-fallback" aria-label={`${title} — no poster available`}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
              <path d="M3 16l5-5 4 4 3-3 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              <circle cx="9" cy="9" r="1.5" fill="currentColor" />
            </svg>
            <div className="cf-card__poster-fallback-title">{title}</div>
          </div>
        )}
        <div className="cf-card__overlay" aria-hidden="true" />
        {rating != null && (
          <div className="cf-card__rating">
            <RatingBadge rating={rating} />
          </div>
        )}
        <div className="cf-card__fav">
          <FavoriteButton movie={movie} />
        </div>
      </div>
      <div className="cf-card__meta">
        <h3 className="cf-card__title" title={title}>{title}</h3>
        {releaseYear && <span className="cf-card__year">{releaseYear}</span>}
      </div>
    </article>
  );
}

export default memo(MovieCard);