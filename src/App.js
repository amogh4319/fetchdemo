import React,{useState} from 'react';
import {Spinner} from 'react-bootstrap';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
const [movies,setMovies]=useState([]);
const [isLoading,setIsLoading]=useState(false);
  async function fetchMoviesHandler(){
    setIsLoading(true);
   const response=await fetch('https://swapi.dev/api/films/')
   const data=await response.json()
   
      const transformedMovies=data.results.map(moviesData=>{
        return {
        id:moviesData.episode_id,
        title:moviesData.title,
        releaseDate:moviesData.release_date,
        openingText:moviesData.opening_crawl
     } })
      setMovies(transformedMovies);
      setIsLoading(false);
    }
  

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
      {!isLoading&& movies.length>0 && <MoviesList movies={movies} />}
      {!isLoading&& movies.length===0 && <p>No movies</p>}
      {isLoading&&  <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>}
      
      </section>
    </React.Fragment>
  );
}

export default App;
