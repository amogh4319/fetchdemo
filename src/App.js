import React,{useCallback, useEffect, useState} from 'react';
import {Spinner} from 'react-bootstrap';
import MoviesList from './components/MoviesList';
import './App.css';
import MoviesForm from './components/MoviesForm';

function App() {
const [movies,setMovies]=useState([]);
const [isLoading,setIsLoading]=useState(false);
const [error,setError]=useState(null);


  const fetchMoviesHandler=useCallback(async ()=>{
    
    setIsLoading(true);
    setError(null);
    try{
   const response=await fetch('https://react-http-4aee6-default-rtdb.firebaseio.com/movies.json')
   
   if(!response.ok){
    throw new Error('something went wrong....Retrying!')
   }
   const data=await response.json()
   
   const loadedMovies=[];
   for(const key in data){
    loadedMovies.push({
      id:key,
      title:data[key].title,
      openingText:data[key].openingText,
      releaseDate:data[key].releaseDate,
    })
   }
     
      setMovies(loadedMovies);
      
    }
  catch(error){
      setError(error.message);
  }
  setIsLoading(false);
},[]);
  
useEffect(()=>{
  fetchMoviesHandler()
},[fetchMoviesHandler]);

async function addMovieHandler(movie) {
  const response=await fetch('https://react-http-4aee6-default-rtdb.firebaseio.com/movies.json',{
    method:'POST',
    body:JSON.stringify(movie),
    headers:{
      'Content-Types':'application/json'
    }
  })
  const data=await response.json()
  console.log(data);
}
const removeHandler = async (id) => {
  const response = await fetch(
    `https://react-http-4aee6-default-rtdb.firebaseio.com/movies/${id}.json`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    setError('Failed to delete movie.');
    return;
  }

  setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
};
  return (
    <React.Fragment>
      <section>
        <MoviesForm onAddMovie={addMovieHandler}/>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
      {!isLoading&& movies.length>0 && <MoviesList movies={movies} onRemove={removeHandler} />}
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
