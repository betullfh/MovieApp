import { Button, Grid2, InputAdornment, TextField } from '@mui/material'
import { FaLock } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import React from 'react'
import '../css/RegisterPage.css'
import { useFormik } from 'formik';
import RegisterPageService from '../services/RegisterPageService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../types/Types';
import { RegisterPageSchemas } from '../schemas/RegisterPageSchemas';
import { useDispatch } from 'react-redux';
import loginPageService from '../services/LoginPageService';
import { setCurrentuser, setloading } from '../redux/appSlice';
import '../css/RegisterPage.css'


interface CheckUserType {
  currentUser: UserType | null,
  result: boolean
}

function LoginPage() {

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const checkUser=(UserList: UserType[], username:string, password:string)=>{
    const response:CheckUserType={result: false, currentUser: null}

    UserList.forEach((user: UserType)=>{
      if(username===user.username && password ===user.password)
      {
        response.result=true
        response.currentUser=user
      }
    })
    return response
  }

  const submit=async()=>
{
  try {
    dispatch(setloading(true))
    const response: UserType[]=await loginPageService.login()
    if(response)
    {
      const checkUserResponse: CheckUserType= checkUser(response, values.username, values.password)
      if(checkUserResponse.currentUser && checkUserResponse.result)
      {
         dispatch(setCurrentuser(checkUserResponse.currentUser))
         localStorage.setItem("currentUser", JSON.stringify(checkUserResponse.currentUser))
         navigate("/")
         toast.success("Giriş Başarılı.")
      }
      else
      {
        toast.error("Kullanıcı adı veya şifre hatalı.")
      }
    }
  } catch (error) {
    toast.error("Hatalı giriş " + error)
  }
  finally{
    dispatch(setloading(false))
  }
}
  const {values,errors,handleChange,handleSubmit, resetForm}  = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: submit,
    validationSchema: RegisterPageSchemas
  })

  const clear =()=>{
    resetForm()
  }

  return (
    <div>
       <div className='register-login'>
      <div className='main'>
        <form onSubmit={handleSubmit} className='register-form'>
            <div className='form-input'>
            <h3 className='login-register-title'>Lüyfen Giriş Yapın.</h3>
                   <div className='inputs'>
                   <Grid2 container spacing={2}>
                   <TextField  sx={{marginBottom:"30px"}}
                        id="username"
                        placeholder='Kullanıcı adı'
                        slotProps={{
                        input: {
                            startAdornment: (
                            <InputAdornment position="start">
                                <FaUserCircle />
                            </InputAdornment>
                            ),
                        }, 
                        }}
                        variant="standard" 
                        color='primary'
                        onChange={handleChange}
                        value={values.username}
                        helperText={errors.username && <span style={{color:"#b20404"}}>{errors.username}</span>}
                    /> 
                    <TextField
                        id="password"
                        type='password'
                        placeholder='Şifre'
                        slotProps={{
                        input: {
                            startAdornment: (
                            <InputAdornment position="start">
                                <FaLock/>
                            </InputAdornment>
                            ),
                        },
                        }}
                        variant="standard" 
                       color='primary'
                       onChange={handleChange}
                       value={values.password}
                       helperText={errors.password && <span style={{color:"#b20404"}}>{errors.password}</span>}
                    />
                   </Grid2>
                   </div>
           
            <div className='form-button'>
                    <Grid2 container spacing={5}>
                        <Button variant='contained'  type='submit'>Giriş Yap</Button>
                        <Button variant='contained'color='info' sx={{backgroundColor:"#929292"}} onClick={clear}>Temizle</Button>
                    </Grid2>
            </div>
            </div>
           <div className='login-choice'>
                
                <div className='to-login'>
                    <p  onClick={()=>navigate("/signup")}  className='login-p'>Hesabınız Yok mu? Kaydolun.</p>
                </div>
           </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default LoginPage