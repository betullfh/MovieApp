import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentuser, setloading, setMovies } from '../redux/appSlice'
import movieService from '../services/MovieService'
import { RootState } from '../redux/store'
import { MovieDetailType, MovieType, UserType } from '../types/Types'
import { toast } from 'react-toastify'
import MovieCard from '../components/MovieCard'
import { Container } from '@mui/material'
import '../css/Movies.css'
import { useNavigate } from 'react-router-dom'


function Movies() {
  const dispatch = useDispatch()
  const { movies } = useSelector((state: RootState) => state.app)
  const navigate = useNavigate()

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

  const handleMovieClick = (movieId: number) => {
    navigate(`/details/${movieId}`);
  };



  return (
    <Container maxWidth="xl" >
      <div style={{ display: 'flex', flexWrap: 'wrap' }} className='all-movies'>
        {
          movies && movies.map((movie: MovieType, index: number) => (
            <div onClick={() => handleMovieClick(movie.id)} key={index} style={{ margin: '0px 30px' }}>
              <MovieCard movie={movie} />

            </div>
          ))
        }
      </div>
    </Container>
  )
}

export default Movies