import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import Navbar from './components/Navbar';
import RouterConfig from './config/RouterConfig'
import RegisterPage from './pages/RegisterPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from './redux/store';
import Spinner from './components/Spinner';
import MovieDetails from './components/MovieDetails';
import { setdrawer, addLikedMovies, setLikedMovies } from './redux/appSlice';
import { Drawer } from '@mui/material';
import Profile from './pages/Profile';
import { useEffect } from 'react';
import { MovieDetailType } from './types/Types';
import Categories from './components/Categories';

function App() {
   const {currentUser, drawer}=useSelector((state: RootState)=>state.app)

   const dispatch=useDispatch()
   const closedrawer=()=>{
    dispatch(setdrawer())
  }

  useEffect(()=>{
    const likedMoviesstring= localStorage.getItem("basket")
    if(likedMoviesstring)
      {
        const likedmovies : MovieDetailType[]= JSON.parse(likedMoviesstring) as MovieDetailType[]
        dispatch(setLikedMovies(likedmovies))
      } 
  },[])
   
  return (
   <div>
    {currentUser && <Navbar/>}
    <Spinner/>
     <ToastContainer autoClose={2000} />
     <Drawer anchor='right' onClose={closedrawer} open={drawer}><Profile/>
     </Drawer>
    
    <RouterConfig/>
   </div>
  )
}

export default App
