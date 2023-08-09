import React, { useState } from 'react';
import { Button } from 'react-bootstrap';


const MoviesForm=(props)=> {
    const [title,setTitle]=useState('');
    const [openingText,setOpeningText]=useState('');
    const [releaseDate,setReleaseDate]=useState('');

    const titleHandler=(event)=>{
        setTitle(event.target.value)
    }
    const openingTextHandler=(event)=>{
        setOpeningText(event.target.value)
    }
    const releaseDateHandler=(event)=>{
        setReleaseDate(event.target.value)
    }
    const submission=(event)=>{
        event.preventDefault();
        const moviesObj={
            title:title,
            openingText:openingText,
            releaseDate:releaseDate
        }
        console.log(moviesObj);
    }


    return (
      <div>
        <div><label>Title</label></div>
        <div><input type="text" onChange={titleHandler}/></div>
        <div><label>Opening text</label></div>
        <div><input type="text" onChange={openingTextHandler}/></div>
        <div><label>Release Date</label></div>
        <div><input type="text" onChange={releaseDateHandler}/></div>
        <div><Button onClick={submission} className='mt-3'>Add Movies</Button></div>

      </div>
    );
  }
export default MoviesForm;
