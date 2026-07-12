/* global process */
import axios from 'axios';

const API_KEY =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_TMDB_API_KEY) ||
  (typeof process !== 'undefined' && process.env && process.env.VITE_TMDB_API_KEY) ||
  '';

export class TmdbConfigError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TmdbConfigError';
  }
}

export class TmdbApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'TmdbApiError';
    this.status = status;
  }
}

const tmdbClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
  },
});

export async function getPopularMovies(page = 1) {
  const response = await tmdbClient.get('/movie/popular', {
    params: { page },
  });
  return response.data;
}

export async function searchMovies(query, page = 1) {
  if (!query || !query.trim()) {
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }
  const response = await tmdbClient.get('/search/movie', {
    params: { query: query.trim(), page, include_adult: false },
  });
  return response.data;
}

const genreMap = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  "Science Fiction": 878,
  Thriller: 53,
  War: 10752,
  Western: 37,
};

export async function discoverMoviesByMood(genre, page = 1) {
  let genreId = genreMap[genre];

  if (!genreId && typeof genre === 'string') {
    const cleaned = genre.trim();
    const matchedKey = Object.keys(genreMap).find(
      (k) => k.toLowerCase() === cleaned.toLowerCase() || cleaned.toLowerCase().includes(k.toLowerCase())
    );
    if (matchedKey) genreId = genreMap[matchedKey];
  }

  if (!genreId) {
    genreId = genreMap['Drama'];
  }

  const response = await tmdbClient.get('/discover/movie', {
    params: {
      with_genres: genreId,
      sort_by: 'popularity.desc',
      page,
      include_adult: false,
      'vote_average.gte': 6,
      'vote_count.gte': 300,
    },
  });

  return response.data;
}
export async function getMovieDetails(movieId, params = {}) {
  if (!movieId) return null;
  const response = await tmdbClient.get(`/movie/${movieId}`, {
    params,
  });
  return response.data;
}

export async function getMovieRecommendations(movieId, page = 1) {
  if (!movieId) return { page: 1, results: [], total_pages: 0, total_results: 0 };
  const response = await tmdbClient.get(`/movie/${movieId}/recommendations`, {
    params: { page },
  });
  return response.data;
}

export async function getMovieCredits(movieId) {
  if (!movieId) return { id: movieId, cast: [], crew: [] };
  const response = await tmdbClient.get(`/movie/${movieId}/credits`);
  return response.data;
}

export async function getMovieVideos(movieId) {
  if (!movieId) return { id: movieId, results: [] };
  const response = await tmdbClient.get(`/movie/${movieId}/videos`);
  return response.data;
}