import React,{useCallback, useEffect, useState} from 'react';
import {Spinner} from 'react-bootstrap';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
const [movies,setMovies]=useState([]);
const [isLoading,setIsLoading]=useState(false);
const [error,setError]=useState(null);


  const fetchMoviesHandler=useCallback(async ()=>{
    
    setIsLoading(true);
    setError(null);
    try{
   const response=await fetch('https://swapi.dev/api/films/')
   
   if(!response.ok){
    throw new Error('something went wrong....Retrying!')
   }
   const data=await response.json()
   
      const transformedMovies=data.results.map(moviesData=>{
        return {
        id:moviesData.episode_id,
        title:moviesData.title,
        releaseDate:moviesData.release_date,
        openingText:moviesData.opening_crawl
     } })
      setMovies(transformedMovies);
      
    }
  catch(error){
      setError(error.message);
  }
  setIsLoading(false);
},[]);
  
useEffect(()=>{
  fetchMoviesHandler()
},[fetchMoviesHandler]);
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
      {!isLoading&& movies.length>0 && <MoviesList movies={movies} />}
      {!isLoading&& movies.length===0 && !error && <p>No movies</p>}
      {!isLoading&& error && <p>{error}</p>}
      {isLoading&&  <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>}
      
      </section>
    </React.Fragment>
  );
}

export default App;
