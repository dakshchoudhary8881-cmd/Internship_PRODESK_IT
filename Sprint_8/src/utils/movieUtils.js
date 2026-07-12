export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
export const POSTER_SIZE = 'w500';
export const BACKDROP_SIZE = 'original';
export const POSTER_SMALL_SIZE = 'w200';
export const FALLBACK_POSTER = null;

export function buildPosterUrl(posterPath, size = POSTER_SIZE) {
  if (!posterPath) return FALLBACK_POSTER;
  return `${TMDB_IMAGE_BASE_URL}/${size}${posterPath}`;
}

export function buildBackdropUrl(backdropPath, posterPath) {
  if (backdropPath) {
    return `${TMDB_IMAGE_BASE_URL}/${BACKDROP_SIZE}${backdropPath}`;
  }
  if (posterPath) {
    return `${TMDB_IMAGE_BASE_URL}/w1280${posterPath}`;
  }
  return null;
}

export function extractReleaseYear(releaseDate) {
  if (!releaseDate || typeof releaseDate !== 'string') return null;
  const year = releaseDate.slice(0, 4);
  return /^\d{4}$/.test(year) ? year : null;
}

export function normalizeRating(voteAverage) {
  if (typeof voteAverage !== 'number' || Number.isNaN(voteAverage)) return null;
  return Math.round(voteAverage * 10) / 10;
}

export function normalizeMovie(rawMovie) {
  if (!rawMovie || typeof rawMovie.id === 'undefined') return null;

  return {
    id: rawMovie.id,
    title: rawMovie.title || rawMovie.original_title || 'Untitled',
    posterUrl: buildPosterUrl(rawMovie.poster_path),
    posterPath: rawMovie.poster_path || null,
    backdropUrl: buildBackdropUrl(rawMovie.backdrop_path, rawMovie.poster_path),
    backdropPath: rawMovie.backdrop_path || null,
    releaseDate: rawMovie.release_date || null,
    releaseYear: extractReleaseYear(rawMovie.release_date),
    rating: normalizeRating(rawMovie.vote_average),
    overview: rawMovie.overview || '',
    genreIds: Array.isArray(rawMovie.genre_ids) ? rawMovie.genre_ids : [],
  };
}

export function normalizeMovieList(rawMovies) {
  if (!Array.isArray(rawMovies)) return [];
  return rawMovies.map(normalizeMovie).filter(Boolean);
}

export function mergeUniqueMovies(existingMovies, newMovies) {
  const seenIds = new Set(existingMovies.map((movie) => movie.id));
  const seenTitles = new Set(
    existingMovies.map((movie) => (movie.title || '').trim().toLowerCase())
  );

  const uniqueNewMovies = newMovies.filter((movie) => {
    const titleKey = (movie.title || '').trim().toLowerCase();
    if (seenIds.has(movie.id) || seenTitles.has(titleKey)) {
      return false;
    }
    seenIds.add(movie.id);
    seenTitles.add(titleKey);
    return true;
  });

  return [...existingMovies, ...uniqueNewMovies];
}