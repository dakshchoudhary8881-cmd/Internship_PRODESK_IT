import { useCallback, useEffect, useRef, useState } from 'react';
import { getPopularMovies, searchMovies, discoverMoviesByMood, TmdbConfigError } from '../services/tmdbApi';
import { normalizeMovieList, mergeUniqueMovies } from '../utils/movieUtils';

export function useMovies({ mode, query = '', genre = 'Drama' }) {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const requestIdRef = useRef(0);

  const fetchPage = useCallback(
    async (page, { isFirstPage }) => {
      const thisRequestId = ++requestIdRef.current;

      if (isFirstPage) {
        setIsInitialLoading(true);
        setError(null);
      } else {
        setIsLoadingMore(true);
      }

      try {
        const fetcher =
          mode === 'search'
            ? () => searchMovies(query, page)
            : mode === 'mood'
              ? () => discoverMoviesByMood(genre, page)
              : () => getPopularMovies(page);

        const data = await fetcher();

        if (thisRequestId !== requestIdRef.current) {
          return;
        }

        const normalized = normalizeMovieList(data?.results || []);

        setMovies((prev) => (isFirstPage ? normalized : mergeUniqueMovies(prev, normalized)));
        setCurrentPage(data?.page || page || 1);
        setTotalPages(data?.total_pages || data?.totalPages || 0);
        setError(null);
      } catch (err) {
        if (thisRequestId !== requestIdRef.current) {
          return;
        }

        if (err instanceof TmdbConfigError) {
          setError({ type: 'config', message: err.message });
        } else {
          setError({ type: 'api', message: err.message || 'Failed to load movies.' });
        }

        if (isFirstPage) {
          setMovies([]);
          setTotalPages(0);
        }
      } finally {
        if (thisRequestId === requestIdRef.current) {
          setIsInitialLoading(false);
          setIsLoadingMore(false);
        }
      }
    },
    [mode, query, genre]
  );

  useEffect(() => {
    if (mode === 'search' && !query?.trim()) {
      requestIdRef.current += 1;
      setMovies([]);
      setCurrentPage(0);
      setTotalPages(0);
      setIsInitialLoading(false);
      setIsLoadingMore(false);
      setError(null);
      return;
    }

    setCurrentPage(0);
    setTotalPages(0);
    fetchPage(1, { isFirstPage: true });
  }, [mode, query, genre]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      requestIdRef.current += 1;
    };
  }, []);

  const fetchNextPage = useCallback(() => {
    if (isInitialLoading || isLoadingMore) return;
    if (currentPage === 0 || currentPage >= totalPages) return;
    fetchPage(currentPage + 1, { isFirstPage: false });
  }, [currentPage, totalPages, isInitialLoading, isLoadingMore, fetchPage]);

  const refetch = useCallback(() => {
    fetchPage(currentPage || 1, { isFirstPage: currentPage <= 1 });
  }, [currentPage, fetchPage]);

  const hasNextPage = currentPage > 0 && currentPage < totalPages;

  return {
    movies,
    currentPage,
    totalPages,
    hasNextPage,
    isInitialLoading,
    isLoadingMore,
    error,
    fetchNextPage,
    refetch,
  };
}