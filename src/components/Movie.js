import React from 'react';

import classes from './Movie.module.css';
import { Button } from 'react-bootstrap';

const Movie = (props) => {
  const handleRemove = () => {
    props.onRemove(props.id);
  };
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <Button onClick={handleRemove} variant='danger'>REMOVE</Button>
    </li>
  );
};

export default Movie;
