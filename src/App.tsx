import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import SearchBar from './components/SearchBar/SearchBar';
import fetchMovies from './services/movieService';
import { type Movie } from './types/movie';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setMovies([]);
    setIsLoading(true);

    try {
      const results = await fetchMovies({ query });

      if (results.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }

      setMovies(results);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />

      {isLoading && <p style={{ textAlign: 'center' }}>Loading...</p>}

      <main>
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>Rating: {movie.vote_average}</p>
              <p>{movie.release_date}</p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}