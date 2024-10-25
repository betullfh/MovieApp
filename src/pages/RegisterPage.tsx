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

function RegisterPage() {

    const navigate=useNavigate()

    const submit = async(values: any, actions: any)=>{
        try {
            const payload: UserType={
                username: values.username,
                password: values.password,
                id: String(Math.floor(Math.random()*99999))
            }
            const response= await RegisterPageService.register(payload)
            if (response)
            {
                clear()
                toast.success("Kayıt Başarılı.")
                navigate("/login")
            }
        } catch (error:any) {
            toast.error(error.message)
        }
       }

    const {values, handleChange, handleSubmit, errors, resetForm} = useFormik({
        initialValues: {
          username:"",
          password:""
        },
        onSubmit: submit,
        validationSchema: RegisterPageSchemas
      });
     
      const clear =()=>{
        resetForm()
      }

  return (
    <div className='register-login'>
      <div className='main'>
        <form onSubmit={handleSubmit} className='register-form'>
            <div className='form-input'>
            <h3 className='login-register-title'>Bir Hesap Edinin. </h3>
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
                        <Button variant='contained'  type='submit'>Kayıt Ol</Button>
                        <Button variant='contained'color='info' sx={{backgroundColor:"#929292"}} onClick={clear}>Temizle</Button>
                    </Grid2>
            </div>
            </div>
           <div className='login-choice'>
               
                <div className='to-login'>
                    <p className='login-p'>Hesabınız var mı?</p>
                </div>
           </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage