import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { setCurrentuser, setloading, setMovies } from '../redux/appSlice'
import { MovieType, UserType } from '../types/Types'
import movieService from '../services/MovieService'
import { toast } from 'react-toastify'
import MovieCard from '../components/MovieCard'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import "../css/HomePage.css"
import { Link, useNavigate } from 'react-router-dom'
import Categories from '../components/Categories'
import { GrCaretNext } from "react-icons/gr";
import { BiLike } from "react-icons/bi";
import { CiCircleMore } from "react-icons/ci";



function HomePage() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { movies } = useSelector((state: RootState) => state.app)
  const [randomMovie, setrandomMovie] = useState<MovieType | null>()



  const image_url = "https://image.tmdb.org/t/p/w500"
  const getMovies = async () => {
    try {
      dispatch(setloading(true))
      const response: MovieType[] = await movieService.getMovies()
      if (response) {
        dispatch(setMovies(response))
      }

    } catch (error) {
      toast.error("Hata oluştu")
    }
    finally {
      dispatch(setloading(false))
    }
  }


  useEffect(() => {

    getMovies()
  }, [])

  useEffect(() => {
    const result = localStorage.getItem("currentUser")
    if (result) {
      const currentUser: UserType = JSON.parse(result) as UserType
      dispatch(setCurrentuser(currentUser))
    }
  }, [])


  useEffect(() => {
    if (movies.length > 0) {
      showRandomMovie()
    }
  }, [movies]);



  const showRandomMovie = () => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie: MovieType = movies[randomIndex];
    setrandomMovie(randomMovie);
  };




  return (
    <div className='home-page'>
      <Categories />
      <div className='left-side'>
        <div className='recommend'>
          <h2 style={{ fontFamily: "sans-serif", color: "#9aa1b1" }}>Ne izlesek?</h2>
        </div>


        <Card className='card'>
          <CardMedia
            component="img"
            alt="green iguana"
            height="100"
            image={image_url + randomMovie?.backdrop_path}
          />

          <div className='card-content'>
            <CardContent className='card-title' sx={{ display: "flex", flexDirection: "column", width: "350px" }}>
              <Typography gutterBottom variant="h5" component="div" sx={{ display: "flex", flexDirection: "row", width: "100%", fontFamily: "monospace", fontWeight: "bold" }}>
                {randomMovie?.title}
              </Typography>
              <Typography gutterBottom variant="body2" component="div" sx={{ display: "flex", flexDirection: "row", width: "100%", fontFamily: "monospace", fontWeight: "bold", alignItems: "center" }}>
                <BiLike className='movie-likes' style={{ fontSize: "22px", marginRight: "3px", marginBottom: "3px" }} />
                {randomMovie?.vote_count}

              </Typography >
              <div style={{ fontSize: "18px" }}>
                Dil: {randomMovie?.original_language}
              </div>
              <div style={{ fontSize: "18px" }}>
                Yayınlanma Tarihi: {randomMovie?.release_date}
              </div>
            </CardContent>
            <CardActions className='card-buttons' sx={{ display: "flex", flexDirection: "row", width: "250px", marginRight: "40px" }}>

              <p className='navigate-film' onClick={() => navigate(`details/${randomMovie?.id}`)} style={{ fontSize: "22px" }} color='warning'>Filme Git</p>

              <GrCaretNext style={{ fontSize: "25px" }} className='swipe-movie' onClick={showRandomMovie} />


            </CardActions>

          </div>

        </Card>

      </div>
      <div className='movies'>
        {
          movies && movies.slice(0, 5).map((movie: MovieType, index: number) => (
            <MovieCard key={index} movie={movie} />
          ))
        }
        <div className='to-more'>
          <CiCircleMore onClick={() => navigate("/movies")} className='to-more-icon' style={{ fontSize: "25px", color: "#eaf4ffe4", cursor: "pointer" }} />
        </div>
      </div>

    </div>
  )
}


export default HomePage