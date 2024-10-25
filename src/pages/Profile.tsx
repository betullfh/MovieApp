import React, { useEffect } from 'react'
import { setCurrentuser } from '../redux/appSlice'
import { useDispatch, useSelector } from 'react-redux'
import { UserType } from '../types/Types'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../redux/store'
import { FaUserAstronaut } from "react-icons/fa";
import { Button } from '@mui/material'


function Profile() {
    const dispatch=useDispatch()
    const {currentUser}=useSelector((state:RootState)=>state.app)
    const navigate= useNavigate()

    useEffect(()=>{
        const result =localStorage.getItem("currentUser")
        if(result)
        {
          const currentUser: UserType=JSON.parse(result) as UserType
          dispatch(setCurrentuser(currentUser))
        }
      },[])

      const logout=()=>{
        localStorage.removeItem("currentUser")
        dispatch(setCurrentuser(null))
        navigate("/login")
    }
  return (
    <div className='profile'>
       <div className='profile-infos-title'>
       <FaUserAstronaut style={{fontSize:"24px"}}/>
        <h2 style={{marginLeft:"9px", marginTop:"24px"}}>Hesabım</h2>
       </div>
       <div className='profile-infos' style={{alignItems:"center"}}>
           <h3>Kullanıcı Adı: </h3>
            <h4 style={{marginLeft:"9px", textTransform:"capitalize"}}>{currentUser?.username}</h4>
       </div>
       <div>
       <h4 onClick={()=>navigate("/watchedMovies")} className='profile-buttons' style={{marginLeft:"9px"}}>İzlediklerim</h4>
       <h4 onClick={()=>navigate("/likedMovies")} className='profile-buttons'style={{marginLeft:"9px"}}>Favorilerim</h4>
       <Button onClick={logout} color='error' variant='contained' className='profile-buttons'style={{marginLeft:"9px"}}>Çıkış Yap</Button>
       </div>
    </div>
  )
}

export default Profile