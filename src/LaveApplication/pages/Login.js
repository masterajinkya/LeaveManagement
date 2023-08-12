import { Box, Button, Link, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';


function Login() {

    const navigate = useNavigate()

    const [loginData, setLogindata] = useState({
        username: "",
        password: ""
    });

    const handleClick = () => {
        navigate("/register")
    }

    const handleChange = (e) => {
        setLogindata((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const finduser = storedUser.find((user) =>  user.username === loginData.username && user.password === loginData.password)
        if (finduser) {
            alert("login successful");
            console.log("login successful")
            localStorage.setItem("login", JSON.stringify(finduser))
            navigate(`/dashbord/${finduser.role}`)

        } else {
            alert("Invalid Credentials")
            console.log("Invalid Credentials");
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box borderRadius="25px"
                    border={"0.25px solid #ccc"}
                    padding={"60px"}
                    display={"flex"}
                    maxWidth={"540px"}
                    flexDirection={"column"}
                    margin={"50px auto"}
                    boxShadow={"5px 5px 10px #ccc"}
                    sx={{
                        ":hover": {
                            boxShadow: "10px 10px 20px #ccc"
                        }
                    }}>

                    <Typography textAlign="center" color="primary" variant='h4'>Login Form</Typography>

                    <TextField variant='outlined' margin='normal' placeholder='Enter username'
                        type='text' name='username' value={loginData.username} onChange={handleChange} />

                    <TextField variant='outlined' margin='normal' placeholder='Enter Password'
                        type='password' name='password' value={loginData.password} onChange={handleChange} />

                    <Button sx={{ my: 2 }} type='submit' variant='contained'>Login</Button>
                    <div fullWidth className='text-center'><span >Not Registered yet? <Button sx={{p:0}} onClick={handleClick} className='no-underline mr-2'> Signup</Button></span></div>
                </Box>
            </form>

        </>
    )
}

export default Login
