import { Routes , Route} from 'react-router-dom'
import React from 'react'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import MovieDetails from '../components/MovieDetails'
import Movies from '../pages/Movies'
import Profile from '../pages/Profile'
import LikedMovies from '../components/LikedMovies'
import WatchedMovies from '../components/WatchedMovies'
import FilteredMovies from '../components/FilteredMovies'

function RouterConfig() {
  return (
    <Routes>
        <Route  path='/signup' element={<RegisterPage/>} />
        <Route path ='/login' element={<LoginPage/>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/details/:movieID' element={<MovieDetails/>}/>
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/account' element={<Profile/>}/>
        <Route path='/likedMovies' element={<LikedMovies/>}/>
        <Route path='watchedMovies' element={<WatchedMovies/>}/>
        <Route path="filtered/:category" element={<FilteredMovies/>}/>
        </Routes>
  )
}

export default RouterConfig