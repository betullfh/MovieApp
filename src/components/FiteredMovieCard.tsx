import React, { useState } from 'react'
import { MovieDetailType, MovieType } from '../types/Types'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { BiLike } from "react-icons/bi";


interface MovieCardprops{
    filteredmovie: MovieType,
   
    
}
function FilteredMovieCard(props: MovieCardprops) {

    const {backdrop_path, title, vote_count,  id, }= props.filteredmovie
    const [voteCount, setVotecount]=useState<number>(vote_count)
      
      //const navigate= useNavigate()
  
      const image_url="https://image.tmdb.org/t/p/w500"
  
  return (
    <Link to={`details/${id}`}>
    <div >
         <Card className='card-list' sx={{ maxWidth: 290 }}>
         <CardMedia className='card-image' 
        component="img"
        alt="green iguana"
        height="80"
        image={image_url+backdrop_path}
      />

<div className='card-list-content'>
  <CardContent  sx={{ display:"flex",flexDirection:"row", width:"180px", alignItems:"center"}}>
          <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:"monospace"}}>
          {title}
          </Typography>
        </CardContent>
        <CardActions className='card-list-buttons' sx={{ display:"flex",flexDirection:"column",width:"120px"}}>
        <div className='votes'>
        <BiLike  className='movie-likes' style={{fontSize:"22px", marginRight:"3px", marginBottom:"3px"}}/> <span>{voteCount}</span> 
        </div>
        
        <button  className='detail-button' color='warning'>İncele</button>
        </CardActions>
</div>

    </Card>
    </div>
    </Link>
  )
}

export default FilteredMovieCard