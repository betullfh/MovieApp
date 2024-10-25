import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useNavigate, useParams } from 'react-router-dom'
import { setCurrentuser, setfilteredMovies } from '../redux/appSlice'
import { MovieType, UserType } from '../types/Types'
import { Container } from '@mui/material'
import LikedMovieCard from './LikedMovieCard'
import FilteredMovieCard from './FiteredMovieCard'
import Categories from './Categories'

function FilteredMovies() {
    const {filteredmovies}=useSelector((state:RootState)=>state.app)
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const { category } = useParams()


    const handleMovieClick = (movieId: number) => {
        navigate(`/details/${movieId}`);
    };

    

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
             <h2 className='recommend-movie' style={{ alignItems:"center", width:"500px", textAlign:"center",justifyContent:"start", height:"2px", color:"#eaf4ffe4", margin:"30px"}}>{category}</h2>
</div>
    <div style={{ display: 'flex', flexWrap: 'wrap' }} className ='all-movies'>
    {
        filteredmovies && filteredmovies.map((movie: MovieType, index:number)=>(
            <div onClick={() => handleMovieClick(movie.id)}  key={index} style={{ margin: '0px 30px' }}>
            <FilteredMovieCard filteredmovie={movie}/>
        </div>
        ))
    }
    </div>
</Container>
  )
}

export default FilteredMovies