import { memo } from 'react';
import MovieCard from './MovieCard';
import EmptyState from './EmptyState';

function MovieGrid({ movies, emptyMessage, onSelectMovie }) {
  if (!movies || movies.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </div>
  );
}

export default memo(MovieGrid);