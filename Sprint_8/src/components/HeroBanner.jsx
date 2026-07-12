import { useState, useEffect, memo, useCallback } from 'react';
import FavoriteButton from './FavoriteButton';

function HeroBanner({ movies, featuredMovie, onSelectMovie }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [errorIds, setErrorIds] = useState(() => new Set());

  const itemsList = movies && movies.length > 0
    ? movies
    : featuredMovie
      ? [featuredMovie]
      : [];

  const validItems = itemsList.filter((item) => item && !errorIds.has(item.id));
  const activeMovie = validItems[currentIndex % (validItems.length || 1)] || validItems[0] || featuredMovie;

  const nextSlide = useCallback(() => {
    if (validItems.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % validItems.length);
  }, [validItems.length]);

  const prevSlide = useCallback(() => {
    if (validItems.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + validItems.length) % validItems.length);
  }, [validItems.length]);

  useEffect(() => {
    if (validItems.length <= 1 || isPaused) return undefined;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % validItems.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [validItems.length, isPaused]);

  if (!activeMovie) return null;

  const { title, backdropUrl, posterUrl, rating, releaseYear, overview } = activeMovie;
  const bgImage = backdropUrl || posterUrl;
  const bgError = errorIds.has(activeMovie.id);

  return (
    <section className="hero-banner">
      {bgImage && !bgError ? (
        <div className="hero-banner-bg" key={activeMovie.id}>
          <img
            src={bgImage}
            alt={title}
            className="hero-banner-bg-img"
            onError={() => setErrorIds((prev) => new Set(prev).add(activeMovie.id))}
          />
        </div>
      ) : (
        <div className="hero-banner-bg hero-banner-bg-fallback">
          <div className="hero-banner-fallback-glow" />
          <div className="hero-banner-fallback-watermark">{title}</div>
        </div>
      )}
      <div className="hero-banner-gradient" />
      <div className="hero-banner-vignette" />

      {validItems.length > 1 && (
        <>
          <button
            type="button"
            className="hero-carousel-arrow hero-carousel-arrow-prev"
            onClick={prevSlide}
            aria-label="Previous featured movie"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            className="hero-carousel-arrow hero-carousel-arrow-next"
            onClick={nextSlide}
            aria-label="Next featured movie"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}

      <div className="hero-banner-content">
        <div className="hero-banner-tag-row">
          <span className="hero-banner-tag">
            ⚡ TOP TRENDING #{ (currentIndex % validItems.length) + 1 }
          </span>
          <span className="hero-banner-status">● LIVE STREAMING</span>
        </div>
        <h1 className="hero-banner-title">{title}</h1>

        <div className="hero-banner-meta">
          {rating != null && typeof rating === 'number' && !Number.isNaN(rating) && (
            <span className="hero-banner-rating">★ {rating.toFixed(1)} RATING</span>
          )}
          {releaseYear && (
            <span className="hero-banner-year">{releaseYear}</span>
          )}
          <span className="hero-banner-badge">4K ULTRA HD</span>
          <span className="hero-banner-badge">IMAX ENHANCED</span>
          <span className="hero-banner-badge">DOLBY ATMOS</span>
        </div>

        {overview && (
          <p className="hero-banner-overview">
            {overview}
          </p>
        )}

        <div
          className="hero-banner-actions"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            type="button"
            className="hero-btn hero-btn-primary"
            onClick={() => onSelectMovie && onSelectMovie(activeMovie)}
          >
            <span className="hero-btn-icon">▶</span>
            <span className="hero-btn-label">Stream Now</span>
          </button>

          <button
            type="button"
            className="hero-btn hero-btn-secondary"
            onClick={() => onSelectMovie && onSelectMovie(activeMovie)}
          >
            <span className="hero-btn-icon">⚡</span>
            <span className="hero-btn-label">AI Synopsis & Details</span>
          </button>

          <div className="hero-banner-fav">
            <FavoriteButton movie={activeMovie} />
          </div>
        </div>
      </div>

      {validItems.length > 1 && (
        <div
          className="hero-carousel-indicators"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {validItems.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              className={`hero-carousel-dot ${idx === (currentIndex % validItems.length) ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Slide to ${item.title}`}
              title={item.title}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default memo(HeroBanner);


