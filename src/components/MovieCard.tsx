import React, { useState } from 'react'
import { MovieDetailType, MovieType } from '../types/Types'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';
import { BiLike } from "react-icons/bi";
import { Link } from 'react-router-dom';


interface MovieCardprops{
    movie: MovieType,
   
    
}
function MovieCard(props: MovieCardprops) {

  const {backdrop_path, poster_path,title, overview, vote_count, original_language, id, release_date}= props.movie
  const [voteCount, setVotecount]=useState<number>(vote_count)
    
    const navigate= useNavigate()

    const image_url="https://image.tmdb.org/t/p/w500"

    const increament =()=>{
      setVotecount(voteCount+1)
    }
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
        <BiLike onClick={increament} className='movie-likes' style={{fontSize:"22px", marginRight:"3px", marginBottom:"3px"}}/> <span>{voteCount}</span> 
        </div>
        
        <button  className='detail-button' color='warning'>İncele</button>
        </CardActions>
</div>

    </Card>
    </div>
    </Link>
  )
}

export default MovieCard