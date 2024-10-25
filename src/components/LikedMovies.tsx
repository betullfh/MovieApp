import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { MovieDetailType, UserType } from '../types/Types'
import { Container } from '@mui/material'
import MovieCard from './MovieCard'
import LikedMovieCard from './LikedMovieCard'
import { useNavigate } from 'react-router-dom'
import { setCurrentuser, setLikedMovies, setloading } from '../redux/appSlice'

function LikedMovies() {
  const { likedMovies } = useSelector((state: RootState) => state.app)
  const dispatch = useDispatch()
  const navigate=useNavigate()

  const handleMovieClick = (movieId: number) => {
    navigate(`/details/${movieId}`);
};

useEffect(()=>{
   dispatch(setLikedMovies(likedMovies))
},[])


useEffect(()=>{
  const result =localStorage.getItem("currentUser")
  if(result)
  {
    const currentUser: UserType=JSON.parse(result) as UserType
    dispatch(setCurrentuser(currentUser))
  }
},[dispatch])

  return (
    <Container maxWidth="xl" >
            <div style={{ border: "3px solid gray", width: "300px", padding:"10px", borderTop:"0px", borderRight:"0px", borderLeft:"0px"}}>
             <h2 className='recommend-movie' style={{ alignItems:"center", width:"500px", textAlign:"center",justifyContent:"start", height:"2px", color:"#eaf4ffe4", margin:"30px"}}>Favorilerim</h2>
</div>
    <div style={{ display: 'flex', flexWrap: 'wrap' }} className ='all-movies'>
    {
        likedMovies && likedMovies.map((movie: MovieDetailType, index:number)=>(
            <div onClick={() => handleMovieClick(movie.id)}  key={index} style={{ margin: '0px 30px' }}>
            <LikedMovieCard likedmovie={movie}/>
        </div>
        ))
    }
    </div>
</Container>
  )}

export default LikedMovies