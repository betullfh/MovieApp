import { Backdrop } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress';
import { RootState } from '../redux/store';


function Spinner() {

    const {loading}= useSelector((state:RootState)=> state.app)
  return (
    <Backdrop
    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
    open={loading}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
  )
}

export default Spinner