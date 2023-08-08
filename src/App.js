import React, { useState, useEffect } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);

  async function fetchMovies() {
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/film/');

      if (!response.ok) {
        throw new Error('Something went wrong...');
      }

      const data = await response.json();

      const transformedMovies = data.results.map((moviesData) => ({
        id: moviesData.episode_id,
        title: moviesData.title,
        releaseDate: moviesData.release_date,
        openingText: moviesData.opening_crawl,
      }));
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
  }

  async function retryFetchingMovies() {
    setIsLoading(true);
    setRetrying(true);

    while (retrying) {
      await fetchMovies();
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
    }

    setIsLoading(false);
    setRetrying(false);
  }

  useEffect(() => {
    if (retrying) {
      retryFetchingMovies();
    }
  }, [retrying]);

  function handleRetryClick() {
    setRetrying(true);
  }

  function handleCancelClick() {
    setRetrying(false);
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <Button onClick={handleRetryClick} disabled={retrying}>
          Fetch Movies
        </Button>
        {retrying && <Button onClick={handleCancelClick}>Cancel</Button>}
      </section>
      <section>
        {!retrying && !isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!retrying && !isLoading && movies.length === 0 && !error && <p>No movies</p>}
        {!retrying && error && <p>{error}</p>}
        {retrying && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
