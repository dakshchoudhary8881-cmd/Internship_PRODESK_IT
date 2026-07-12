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
  timeout: 8000,
  params: {
    api_key: API_KEY,
  },
});

const fallbackMovies = [
  {
    id: 533535,
    title: 'Deadpool & Wolverine',
    original_title: 'Deadpool & Wolverine',
    overview: 'A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.',
    poster_path: '/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    backdrop_path: '/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg',
    release_date: '2024-07-24',
    vote_average: 8.3,
    vote_count: 3200,
    genre_ids: [28, 35, 878],
  },
  {
    id: 1022789,
    title: 'Inside Out 2',
    original_title: 'Inside Out 2',
    overview: "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up.",
    poster_path: '/vpnVM9B6NMmQpWeZvzWTDfBx6L.jpg',
    backdrop_path: '/stKGOm8DuZwzBFEpA333XbL0gBg.jpg',
    release_date: '2024-06-11',
    vote_average: 7.6,
    vote_count: 4100,
    genre_ids: [16, 10751, 12, 35],
  },
  {
    id: 573435,
    title: 'Bad Boys: Ride or Die',
    original_title: 'Bad Boys: Ride or Die',
    overview: 'After their late former Captain is framed, Lowrey and Burnett try to clear his name, only to end up on the run themselves.',
    poster_path: '/nP6RliHjxsz4irTKsbu8FiCwFWe.jpg',
    backdrop_path: '/3q01ACECG4LDcseLxTI83txn0MD.jpg',
    release_date: '2024-06-05',
    vote_average: 7.5,
    vote_count: 2100,
    genre_ids: [28, 80, 53, 35],
  },
  {
    id: 762441,
    title: 'A Quiet Place: Day One',
    original_title: 'A Quiet Place: Day One',
    overview: 'As New York City is invaded by alien creatures who hunt by sound, a woman named Sam fights to survive with her cat.',
    poster_path: '/yrpPYKijwdMHyTGIOd1ENf1ARNc.jpg',
    backdrop_path: '/2rvx007BTOeybfLqJd03YI0FE7v.jpg',
    release_date: '2024-06-26',
    vote_average: 6.9,
    vote_count: 1450,
    genre_ids: [27, 878, 53],
  },
  {
    id: 786892,
    title: 'Furiosa: A Mad Max Saga',
    original_title: 'Furiosa: A Mad Max Saga',
    overview: 'As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus. Sweeping through the Wasteland they come across the Citadel presided over by The Immortan Joe.',
    poster_path: '/iADOJ8Zymht2JPMoy3R7xceZprc.jpg',
    backdrop_path: '/wNAhuOZ3Zf84jCIlrcI6JhgmY5q.jpg',
    release_date: '2024-05-22',
    vote_average: 7.7,
    vote_count: 3100,
    genre_ids: [28, 12, 878],
  },
  {
    id: 693134,
    title: 'Dune: Part Two',
    original_title: 'Dune: Part Two',
    overview: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
    poster_path: '/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    backdrop_path: '/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
    release_date: '2024-02-27',
    vote_average: 8.3,
    vote_count: 5200,
    genre_ids: [878, 12],
  },
  {
    id: 823464,
    title: 'Godzilla x Kong: The New Empire',
    original_title: 'Godzilla x Kong: The New Empire',
    overview: 'Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.',
    poster_path: '/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg',
    backdrop_path: '/qrGtVFbmD8rljx7ktP6lLzNMBJm.jpg',
    release_date: '2024-03-27',
    vote_average: 7.2,
    vote_count: 3600,
    genre_ids: [28, 878, 12],
  },
  {
    id: 974635,
    title: 'Hit Man',
    original_title: 'Hit Man',
    overview: 'A mild-mannered professor moonlighting as a fake hit man in police stings ignites a chain reaction of trouble when he falls for a potential client.',
    poster_path: '/54j1mIfhWl5qgyx2zM6K06QdK2S.jpg',
    backdrop_path: '/iTW8G3L48fP9t4o0z3zP4P1P5P.jpg',
    release_date: '2024-05-16',
    vote_average: 7.1,
    vote_count: 980,
    genre_ids: [35, 80, 10749],
  },
];

const fallbackDetailsMap = {
  533535: {
    id: 533535,
    title: 'Deadpool & Wolverine',
    original_title: 'Deadpool & Wolverine',
    overview: 'A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.',
    poster_path: '/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    backdrop_path: '/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg',
    release_date: '2024-07-24',
    runtime: 128,
    vote_average: 8.3,
    vote_count: 3200,
    tagline: 'Come together.',
    status: 'Released',
    budget: 200000000,
    revenue: 1300000000,
    genres: [{ id: 28, name: 'Action' }, { id: 35, name: 'Comedy' }, { id: 878, name: 'Science Fiction' }],
    director: 'Shawn Levy',
    credits: {
      cast: [
        { id: 1, name: 'Ryan Reynolds' },
        { id: 2, name: 'Hugh Jackman' },
        { id: 3, name: 'Emma Corrin' },
        { id: 4, name: 'Matthew Macfadyen' },
      ],
      crew: [{ job: 'Director', name: 'Shawn Levy' }, { job: 'Screenplay', name: 'Rhett Reese' }],
    },
    recommendations: { results: fallbackMovies.slice(1, 5) },
    similar: { results: fallbackMovies.slice(2, 6) },
    videos: { results: [] },
  },
};

export async function getPopularMovies(page = 1) {
  try {
    const response = await tmdbClient.get('/movie/popular', {
      params: { page },
    });
    return response.data;
  } catch (err) {
    return {
      page: page || 1,
      results: fallbackMovies,
      total_pages: 5,
      total_results: fallbackMovies.length * 5,
    };
  }
}

export async function searchMovies(query, page = 1) {
  if (!query || !query.trim()) {
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }
  try {
    const response = await tmdbClient.get('/search/movie', {
      params: { query: query.trim(), page, include_adult: false },
    });
    return response.data;
  } catch (err) {
    const q = query.trim().toLowerCase();
    const filtered = fallbackMovies.filter(
      (m) => m.title.toLowerCase().includes(q) || m.overview.toLowerCase().includes(q)
    );
    const results = filtered.length > 0 ? filtered : fallbackMovies.slice(0, 4);
    return {
      page: page || 1,
      results,
      total_pages: 1,
      total_results: results.length,
    };
  }
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

  try {
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
  } catch (err) {
    const results = fallbackMovies.filter((m) =>
      m.genre_ids?.includes(genreId)
    );
    const finalResults = results.length > 0 ? results : fallbackMovies;
    return {
      page: page || 1,
      results: finalResults,
      total_pages: 3,
      total_results: finalResults.length * 3,
    };
  }
}

export async function getMovieDetails(movieId, params = {}) {
  if (!movieId) return null;
  try {
    const response = await tmdbClient.get(`/movie/${movieId}`, {
      params,
    });
    return response.data;
  } catch (err) {
    if (fallbackDetailsMap[movieId]) {
      return fallbackDetailsMap[movieId];
    }
    const movie = fallbackMovies.find((m) => m.id === Number(movieId)) || fallbackMovies[0];
    return {
      ...movie,
      runtime: 120,
      tagline: 'Experience the cinematic spectacle.',
      status: 'Released',
      genres: [{ id: 28, name: 'Action' }, { id: 18, name: 'Drama' }],
      director: 'Acclaimed Director',
      credits: {
        cast: [
          { id: 101, name: 'Lead Actor' },
          { id: 102, name: 'Co-Star' },
        ],
        crew: [{ job: 'Director', name: 'Acclaimed Director' }],
      },
      recommendations: { results: fallbackMovies.slice(0, 4) },
      similar: { results: fallbackMovies.slice(4, 8) },
      videos: { results: [] },
    };
  }
}

export async function getMovieRecommendations(movieId, page = 1) {
  if (!movieId) return { page: 1, results: [], total_pages: 0, total_results: 0 };
  try {
    const response = await tmdbClient.get(`/movie/${movieId}/recommendations`, {
      params: { page },
    });
    return response.data;
  } catch (err) {
    return {
      page: page || 1,
      results: fallbackMovies.slice(0, 6),
      total_pages: 1,
      total_results: 6,
    };
  }
}

export async function getMovieCredits(movieId) {
  if (!movieId) return { id: movieId, cast: [], crew: [] };
  try {
    const response = await tmdbClient.get(`/movie/${movieId}/credits`);
    return response.data;
  } catch (err) {
    return {
      id: movieId,
      cast: [
        { id: 1, name: 'Star Actor' },
        { id: 2, name: 'Supporting Actor' },
      ],
      crew: [{ job: 'Director', name: 'Director Name' }],
    };
  }
}

export async function getMovieVideos(movieId) {
  if (!movieId) return { id: movieId, results: [] };
  try {
    const response = await tmdbClient.get(`/movie/${movieId}/videos`);
    return response.data;
  } catch (err) {
    return { id: movieId, results: [] };
  }
}