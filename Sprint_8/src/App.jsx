import { useCallback, useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import SearchBar from './components/SearchBar';
import MoodMatcher from './components/MoodMatcher';
import MovieGrid from './components/MovieGrid';
import MovieDetailsModal from './components/MovieDetailsModal';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import InfiniteScrollSentinel from './components/InfiniteScrollSentinel';
import Footer from './components/Footer';
import { useDebounce } from './hooks/useDebounce';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import { useMovies } from './hooks/useMovies';
import { useFavorites } from './context/FavoritesContext';
import { getMovieRecommendationFromMood } from './services/geminiApi';

const VIEWS = {
  POPULAR: 'popular',
  SEARCH: 'search',
  FAVORITES: 'favorites',
  MOOD: 'mood',
};

export default function App() {
  const [activeView, setActiveView] = useState(VIEWS.POPULAR);
  const [searchQuery, setSearchQuery] = useState('');
  const [, setMood] = useState('');
  const [moodGenre, setMoodGenre] = useState('Drama');
  const [moodLoading, setMoodLoading] = useState(false);
  const [moodError, setMoodError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const debouncedQuery = useDebounce(searchQuery, 500);
  const { favorites } = useFavorites();

  useEffect(() => {
    if (activeView === VIEWS.FAVORITES) return;
    if (activeView === VIEWS.MOOD && !debouncedQuery.trim()) return;
    setActiveView(debouncedQuery.trim() ? VIEWS.SEARCH : VIEWS.POPULAR);
  }, [debouncedQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchMode =
    activeView === VIEWS.SEARCH
      ? 'search'
      : activeView === VIEWS.MOOD
        ? 'mood'
        : 'popular';

  const {
    movies,
    hasNextPage,
    isInitialLoading,
    isLoadingMore,
    error,
    fetchNextPage,
    refetch,
  } = useMovies({ mode: fetchMode, query: debouncedQuery, genre: moodGenre });

  const isFavoritesView = activeView === VIEWS.FAVORITES;

  const displayedMovies = isFavoritesView ? favorites : movies;

  const infiniteScrollEnabled = !isFavoritesView && hasNextPage;

  const sentinelRef = useInfiniteScroll({
    onIntersect: fetchNextPage,
    enabled: infiniteScrollEnabled,
    isLoading: isLoadingMore,
  });

  const handleViewChange = useCallback((nextView) => {
    setActiveView(nextView);
    if (nextView !== VIEWS.SEARCH && nextView !== VIEWS.MOOD) {
      setSearchQuery('');
    }
  }, []);

  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
  }, []);

  const handleMoodSubmit = useCallback(async (moodValue) => {
    setMood(moodValue);
    setMoodLoading(true);
    setMoodError(null);
    setSearchQuery('');

    try {
      const genre = await getMovieRecommendationFromMood(moodValue);
      setMoodGenre(genre);
      setActiveView(VIEWS.MOOD);
    } catch (err) {
      setMoodError(err.message || 'Could not classify that mood.');
    } finally {
      setMoodLoading(false);
    }
  }, []);

  const emptyMessage = useMemo(() => {
    if (isFavoritesView) return 'You have not added any favorites yet.';
    if (activeView === VIEWS.SEARCH) return 'No movies matched your search.';
    if (activeView === VIEWS.MOOD) return `No movies found for ${moodGenre} mood right now.`;
    return 'No popular movies available right now.';
  }, [isFavoritesView, activeView, moodGenre]);

  const showInitialLoading = !isFavoritesView && isInitialLoading;
  const showError = !isFavoritesView && error && !isInitialLoading;

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  const heroMovies = useMemo(() => displayedMovies.slice(0, 6), [displayedMovies]);

  const handleModalClose = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  const handleModalSelectGenre = useCallback((genre) => {
    setSelectedMovie(null);
    handleSearchChange(genre);
    setActiveView(VIEWS.SEARCH);
  }, [handleSearchChange]);

  return (
    <div className="app-shell">
      <Header activeView={activeView} onViewChange={handleViewChange} />

      {!showInitialLoading && !showError && displayedMovies.length > 0 && (
        <HeroBanner
          movies={heroMovies}
          featuredMovie={displayedMovies[0]}
          onSelectMovie={setSelectedMovie}
        />
      )}

      <section className="search-section">
        <SearchBar value={searchQuery} onChange={handleSearchChange} />
        <MoodMatcher
          onMoodSubmit={handleMoodSubmit}
          isLoading={moodLoading}
          error={moodError}
        />
      </section>

      <section className="content-section">
        <div className="section-header">
          <div className="section-header-accent" />
          <h2>
            {isFavoritesView && '💖 Your Personal Watchlist'}
            {!isFavoritesView && activeView === VIEWS.SEARCH && `⚡ Discovery Results for "${debouncedQuery}"`}
            {!isFavoritesView && activeView === VIEWS.MOOD && `✨ Vibe Match: ${moodGenre} Movies`}
            {!isFavoritesView && activeView === VIEWS.POPULAR && '⚡ Explore CineVerse Catalog'}
          </h2>
        </div>

        {showInitialLoading && <LoadingState message="Loading movies…" />}

        {showError && (
          <ErrorState message={error.message} onRetry={handleRetry} />
        )}

        {!showInitialLoading && !showError && (
          <MovieGrid
            movies={displayedMovies}
            emptyMessage={emptyMessage}
            onSelectMovie={setSelectedMovie}
          />
        )}

        {!isFavoritesView && isLoadingMore && <LoadingState message="Loading more…" />}

        {infiniteScrollEnabled && (
          <InfiniteScrollSentinel ref={sentinelRef} isLoadingMore={isLoadingMore} />
        )}

        {!isFavoritesView && !infiniteScrollEnabled && !showInitialLoading && displayedMovies.length > 0 && (
          <div className="end-of-results" role="status">
            You've reached the end of the catalog.
          </div>
        )}
      </section>

      <Footer />

      <MovieDetailsModal
        movie={selectedMovie}
        onClose={handleModalClose}
        onSelectGenre={handleModalSelectGenre}
        onSelectMovie={setSelectedMovie}
      />
    </div>
  );
}