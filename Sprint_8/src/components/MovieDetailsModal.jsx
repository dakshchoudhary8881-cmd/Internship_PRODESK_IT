import { useEffect, useState, memo } from 'react';
import RatingBadge from './RatingBadge';
import FavoriteButton from './FavoriteButton';
import { getMovieDetails } from '../services/tmdbApi';
import { buildPosterUrl, normalizeMovie } from '../utils/movieUtils';

function MovieDetailsModal({ movie, onClose, onSelectGenre, onSelectMovie }) {
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [detailsData, setDetailsData] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isPlayingTrailer) {
          setIsPlayingTrailer(false);
        } else {
          onClose?.();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlayingTrailer, onClose]);

  useEffect(() => {
    if (!movie?.id) {
      setDetailsData(null);
      return undefined;
    }
    let isMounted = true;
    setIsLoadingDetails(true);
    getMovieDetails(movie.id, { append_to_response: 'credits,videos,recommendations,similar' })
      .then((data) => {
        if (isMounted && data) {
          setDetailsData(data);
          setIsLoadingDetails(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsLoadingDetails(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [movie?.id]);

  if (!movie) return null;

  const {
    title = 'Untitled',
    posterUrl,
    backdropUrl,
    releaseYear = '',
    releaseDate = '',
    rating = null,
    overview = '',
  } = movie;

  const genres = (detailsData?.genres || []).map((g) => (typeof g === 'object' && g !== null ? g.name : g)).filter(Boolean);
  const director = detailsData?.director || detailsData?.credits?.crew?.find((m) => m.job === 'Director')?.name || null;
  const cast = detailsData?.cast || (Array.isArray(detailsData?.credits?.cast) ? detailsData.credits.cast.slice(0, 5).map((m) => m.name).join(', ') : null);
  const runtime = detailsData?.runtime ? `${detailsData.runtime} min` : null;
  const spokenLanguages = detailsData?.spokenLanguages || (Array.isArray(detailsData?.spoken_languages) ? detailsData.spoken_languages.map((l) => l.english_name || l.name).join(', ') : null);
  const recommendations = Array.isArray(detailsData?.recommendations) ? detailsData.recommendations : (detailsData?.recommendations?.results || []);
  const similar = Array.isArray(detailsData?.similar) ? detailsData.similar : (detailsData?.similar?.results || []);

  const writers = detailsData?.credits?.crew?.filter((m) => m.job === 'Screenplay' || m.job === 'Writer').slice(0, 3).map((m) => m.name).join(', ') || null;
  const status = detailsData?.status || null;
  const budget = detailsData?.budget && detailsData.budget > 0 ? `$${detailsData.budget.toLocaleString()}` : null;
  const revenue = detailsData?.revenue && detailsData.revenue > 0 ? `$${detailsData.revenue.toLocaleString()}` : null;
  const productionCompanies = Array.isArray(detailsData?.production_companies)
    ? detailsData.production_companies.slice(0, 3).map((c) => c.name).join(', ')
    : null;
  const productionCountries = Array.isArray(detailsData?.production_countries)
    ? detailsData.production_countries.slice(0, 2).map((c) => c.name).join(', ')
    : null;
  const voteCount = detailsData?.vote_count ? `${detailsData.vote_count.toLocaleString()} votes` : null;
  const originalTitle = detailsData?.original_title && detailsData.original_title !== title ? detailsData.original_title : null;
  const tagline = detailsData?.tagline || null;

  const videosList = Array.isArray(detailsData?.videos) ? detailsData.videos : (detailsData?.videos?.results || []);
  const youtubeKey = videosList.find(
    (v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
  )?.key;
  const trailerEmbedUrl = youtubeKey
    ? `https://www.youtube-nocookie.com/embed/${youtubeKey}?autoplay=1`
    : `https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(
      `${title} ${releaseYear} official movie trailer`
    )}&autoplay=1`;

  const handleShare = () => {
    const textToCopy = `${title} (${releaseYear || 'Movie'}) - Stream now on CINEVERSE AI!`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2400);
  };

  const handleSelectRelated = (rawMovie) => {
    const normalized = normalizeMovie(rawMovie);
    if (normalized) {
      onSelectMovie?.(normalized);
    }
  };

  return (
    <div className="movie-details-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${title} details`}>
      <div
        className="movie-details-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="movie-details-close"
          onClick={onClose}
          aria-label="Close movie details"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {isPlayingTrailer ? (
          <div className="movie-details-video-wrapper">
            <iframe
              src={trailerEmbedUrl}
              title={`${title} Official Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              type="button"
              className="movie-details-close-video"
              onClick={() => setIsPlayingTrailer(false)}
            >
              ✕ Close Trailer
            </button>
          </div>
        ) : (
          <div className="movie-details-hero">
            {(backdropUrl || posterUrl) ? (
              <img src={backdropUrl || posterUrl} alt={`${title} backdrop`} className="movie-details-hero-img" loading="lazy" />
            ) : (
              <div className="movie-details-hero-fallback">
                <span>{title}</span>
              </div>
            )}
            <div className="movie-details-hero-overlay" />

            <div className="movie-details-hero-content">
              {genres.length > 0 && (
                <div className="movie-details-tags">
                  {genres.map((g) => (
                    <button
                      key={g}
                      type="button"
                      className="movie-details-tag-chip"
                      onClick={() => onSelectGenre?.(g)}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              )}

              <h1 className="movie-details-title">{title}</h1>

              <div className="movie-details-meta">
                {releaseYear && <span className="movie-details-year">{releaseYear}</span>}
                {releaseDate && <span className="movie-details-date">{releaseDate}</span>}
                {isLoadingDetails && !runtime && (
                  <span className="movie-details-runtime movie-details-loading-text">Loading…</span>
                )}
                {runtime && <span className="movie-details-runtime">{runtime}</span>}
                {rating != null && typeof rating === 'number' && !Number.isNaN(rating) && (
                  <div className="movie-details-rating">
                    <RatingBadge rating={rating} />
                  </div>
                )}
                <span className="movie-details-quality">4K UHD</span>
              </div>

              <div className="movie-details-actions">
                <button
                  type="button"
                  className="movie-details-btn-play"
                  onClick={() => setIsPlayingTrailer(true)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>Watch Trailer</span>
                </button>

                <div className="movie-details-action-fav">
                  <FavoriteButton movie={movie} />
                </div>

                <button
                  type="button"
                  className="movie-details-btn-share"
                  onClick={handleShare}
                  title="Share movie"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                  <span>{copiedText ? 'Copied!' : 'Share'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="movie-details-body">
          <div className="movie-details-section movie-details-synopsis-row">
            {posterUrl && (
              <div className="movie-details-poster-wrap">
                <img
                  src={posterUrl}
                  alt={`${title} official poster`}
                  className="movie-details-poster-thumb"
                  loading="lazy"
                />
              </div>
            )}
            <div className="movie-details-synopsis-content">
              <div className="movie-details-synopsis-heading">
                <h3 className="movie-details-section-title">
                  {title} — Synopsis
                </h3>
                {originalTitle && (
                  <span className="movie-details-original-title">
                    (Original Title: {originalTitle})
                  </span>
                )}
              </div>
              {tagline && (
                <div className="movie-details-tagline">
                  "{tagline}"
                </div>
              )}
              <p className="movie-details-overview">
                {overview || 'No synopsis available for this title.'}
              </p>
            </div>
          </div>

          <div className="movie-details-grid-info">
            {director && (
              <div className="movie-details-info-item">
                <span className="movie-details-info-label">Director</span>
                <span className="movie-details-info-value">{director}</span>
              </div>
            )}
            {writers && (
              <div className="movie-details-info-item">
                <span className="movie-details-info-label">Writers</span>
                <span className="movie-details-info-value">{writers}</span>
              </div>
            )}
            {cast && (
              <div className="movie-details-info-item">
                <span className="movie-details-info-label">Cast</span>
                <span className="movie-details-info-value">{cast}</span>
              </div>
            )}
            {status && (
              <div className="movie-details-info-item">
                <span className="movie-details-info-label">Status</span>
                <span className="movie-details-info-value">{status}</span>
              </div>
            )}
            {releaseDate && (
              <div className="movie-details-info-item">
                <span className="movie-details-info-label">Release Date</span>
                <span className="movie-details-info-value">{releaseDate}</span>
              </div>
            )}
            {spokenLanguages && (
              <div className="movie-details-info-item">
                <span className="movie-details-info-label">Languages</span>
                <span className="movie-details-info-value">{spokenLanguages}</span>
              </div>
            )}
            {productionCompanies && (
              <div className="movie-details-info-item">
                <span className="movie-details-info-label">Production</span>
                <span className="movie-details-info-value">{productionCompanies}</span>
              </div>
            )}
            {productionCountries && (
              <div className="movie-details-info-item">
                <span className="movie-details-info-label">Country</span>
                <span className="movie-details-info-value">{productionCountries}</span>
              </div>
            )}
            {budget && (
              <div className="movie-details-info-item">
                <span className="movie-details-info-label">Budget</span>
                <span className="movie-details-info-value">{budget}</span>
              </div>
            )}
            {revenue && (
              <div className="movie-details-info-item">
                <span className="movie-details-info-label">Box Office</span>
                <span className="movie-details-info-value">{revenue}</span>
              </div>
            )}
            {voteCount && (
              <div className="movie-details-info-item">
                <span className="movie-details-info-label">Total Votes</span>
                <span className="movie-details-info-value">{voteCount}</span>
              </div>
            )}
            {isLoadingDetails && !director && !cast && (
              <div className="movie-details-info-item">
                <span className="movie-details-info-label">Details</span>
                <span className="movie-details-info-value movie-details-loading-text">Loading movie details…</span>
              </div>
            )}
          </div>

          {recommendations.length > 0 && (
            <div className="movie-details-section movie-details-related-section">
              <h3 className="movie-details-section-title">Recommendations</h3>
              <div className="movie-details-mini-grid">
                {recommendations.slice(0, 8).map((rec) => (
                  <div
                    key={rec.id}
                    className="movie-details-mini-card"
                    onClick={() => handleSelectRelated(rec)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectRelated(rec);
                      }
                    }}
                  >
                    <img
                      src={buildPosterUrl(rec.poster_path, 'w200') || posterUrl}
                      alt={rec.title}
                      loading="lazy"
                      className="movie-details-mini-card-img"
                    />
                    <div className="movie-details-mini-card-title">
                      {rec.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {similar.length > 0 && (
            <div className="movie-details-section movie-details-related-section">
              <h3 className="movie-details-section-title">Similar Movies</h3>
              <div className="movie-details-mini-grid">
                {similar.slice(0, 8).map((sim) => (
                  <div
                    key={sim.id}
                    className="movie-details-mini-card"
                    onClick={() => handleSelectRelated(sim)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectRelated(sim);
                      }
                    }}
                  >
                    <img
                      src={buildPosterUrl(sim.poster_path, 'w200') || posterUrl}
                      alt={sim.title}
                      loading="lazy"
                      className="movie-details-mini-card-img"
                    />
                    <div className="movie-details-mini-card-title">
                      {sim.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(MovieDetailsModal);
