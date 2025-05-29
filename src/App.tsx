import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from "./App.module.css";
import SearchBar from './components/SearchBar/SearchBar';
import MovieGrid from './components/MovieGrid/MovieGrid';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import MovieModal from './components/MovieModal/MovieModal';
import fetchMovies from './services/movieService';
import { type Movie } from './types/movie';



export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setMovies([]);
    setError(false); 
    setIsLoading(true);
  
    try {
      const results = await fetchMovies({ query });
  
      if (results.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 400));
        setMovies(results);
    } catch (error) {
      setError(true);
      toast.error('Something went wrong. Please try again.');
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />

      {isLoading && <Loader />}

      <main>
      {error ? (
    <ErrorMessage />
  ) : movies.length > 0 ? (
    <MovieGrid movies={movies} onSelect={handleMovieSelect} />
        ) : null}
        {selectedMovie && (
  <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
)}

</main>
    </div>
  );
}