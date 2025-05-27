import axios, { type AxiosResponse } from 'axios';
import { type Movie } from '../types/movie';

const API_URL = 'https://api.themoviedb.org/3/search/movie';
const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzVlOWU2ZjRlNjRhNjRjYTJlMmZjMzMzYjE4NDU4MyIsIm5iZiI6MTc0ODM3MzU3MC4zNTgsInN1YiI6IjY4MzYxMDQyMGNiNzJhY2NlYTgzODhlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rRcIyfYiCMcSX0S06AdsKsBDmIjn0wkjm5s12kMQkEs';

interface FetchMoviesParams {
  query: string;
}

interface FetchMoviesResponse {
  results: Movie[];
}

export default async function fetchMovies({
  query,
}: FetchMoviesParams): Promise<Movie[]> {
  const config = {
    params: { query },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const response: AxiosResponse<FetchMoviesResponse> = await axios.get(
    API_URL,
    config
  );

  return response.data.results;
}