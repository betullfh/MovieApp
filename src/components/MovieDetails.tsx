import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Genre, MovieDetailType, MovieType, UserType } from '../types/Types';
import { useDispatch, useSelector } from 'react-redux';
import { addLikedMovies, addWatchedMovies, setCurrentMovie, setCurrentuser, setloading, setMovies } from '../redux/appSlice';
import { toast } from 'react-toastify';
import { baseApi } from '../services/MovieService';
import { image_url } from '../services/MovieService';
import { BiLike } from "react-icons/bi";
import { RootState } from '../redux/store';
import RecommendMovie from './RecommendMovie';
import { Button, IconButton, Tooltip } from '@mui/material';
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoAddCircle } from "react-icons/io5";





function MovieDetails() {


  const { movieID } = useParams()
  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const dispatch = useDispatch()
  const { likedMovies, watchedMovies } = useSelector((state: RootState) => state.app)
  const [isLiked, setisLiked] = useState<boolean>(false)
  const [isAdded, setisAdded] = useState<boolean>(false)





  const getmovie = async () => {
    try {

      const response = await baseApi.get(`/3/movie/${movieID}?language=en-US`)
      const MovieData: MovieDetailType = response.data
      setMovie(MovieData)
      dispatch(setCurrentMovie(MovieData))
    } catch (error) {
      toast.error("Hata oluştu." + error)
    }
  }

  const like = () => {
    if (movie) {
      const payload: MovieDetailType = {
        ...movie,
        liked: !isLiked
      }

      dispatch(addLikedMovies(payload));
      setisLiked(prev => !prev);
    }
  }
  console.log(likedMovies)

  const toggleWatched = () => {
    if (movie) {
      const payload: MovieDetailType = {
        ...movie,
        watched: !isAdded
      }


      dispatch(addWatchedMovies(payload));
      setisAdded(prev => !prev);
    }
  }

  useEffect(() => {
    if (movie) {
      const found = likedMovies.find(likedMovie => likedMovie.id === movie.id);
      setisLiked(!!found);
    }
  }, [movie, likedMovies]);

  useEffect(() => {
    if (movie) {
      const found = watchedMovies.find(watchedMovie => watchedMovie.id === movie.id);
      setisAdded(!!found);
    }
  }, [movie, likedMovies]);


  useEffect(() => {
    const result = localStorage.getItem("currentUser")
    if (result) {
      const currentUser: UserType = JSON.parse(result) as UserType
      dispatch(setCurrentuser(currentUser))
    }
  }, [])


  useEffect(() => {
    getmovie()
  }, [movieID])





  return (
    <div style={{ display: "flex", flexDirection: "row" }} >
      {movie && (
        <div className='detail-container' style={{ position: "relative", backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0)),linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.9)), url(${image_url}${movie.backdrop_path})` }}>
          <div className='movie-details'>
            <img className='poster-image' width={150} height={200} src={image_url + movie.poster_path} />
            <div className='detail-infos'>
              <h1 style={{ color: "#fff" }}>{movie.title}</h1>
              <p style={{ color: "#fff" }}>{movie.overview}</p>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <div>
                  <div className='detail-votes' style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <BiLike className='movie-likes' style={{ fontSize: "22px", color: "#fff", marginRight: "3px", marginBottom: "3px" }} />
                    <p style={{ color: "#fff" }}>{movie.vote_count}</p>
                  </div>
                  <p style={{ color: "#fff" }}>Dil: {movie.original_language} </p>
                  <p style={{ color: "#fff" }}>Yayınlanma Tarihi: {movie.release_date}</p>
                  <p style={{ color: "#fff" }}>İzlenme: {movie.popularity}</p>
                  <p style={{ color: "#fff" }}>
                    {movie.genres.map((genre, index) => (
                      <span key={index}>
                        {genre.name}
                        {index !== movie.genres.length - 1 && " - "}
                      </span>
                    ))}
                  </p>
                </div>
                <div style={{ marginRight: "10px" }}>
                  <Tooltip title={isLiked ? "Favorilerden Kaldır" : "Favorilere Ekle"} placement='top'>
                    <IconButton>
                      <Button size='large' onClick={() => like()}>{
                        isLiked ? <FcLike style={{ fontSize: "25px" }} /> : <FcLikePlaceholder style={{ fontSize: "25px" }} />
                      }</Button>
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={isAdded ? "İzledklerimden Kaldır" : "İzlediklerime Ekle"} placement='top'>
                    <IconButton>
                      <Button size='large' onClick={toggleWatched}>
                        {
                          isAdded ? <IoAddCircle style={{ fontSize: "28px", color: "blue" }} /> : <IoAddCircleOutline style={{ fontSize: "28px" }} />
                        }
                      </Button>
                    </IconButton>
                  </Tooltip>
                </div>
              </div >
            </div>
          </div>
        </div>
      )}
      <div className="related-movies">

        <RecommendMovie />
      </div>
    </div>

  )
}
export default MovieDetails