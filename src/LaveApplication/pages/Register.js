import { Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { DEPARTMENT } from '../constant/constant';


function Register() {

  const navigate = useNavigate()
  const [registerdata, setRegisterdata] = useState({
    role: "hod",
    fname: "",
    lname: "",
    email: "",
    contact: "",
    department: "",
    username: "",
    password: ""
  });

  const [data, setData] = useState(JSON.parse(localStorage.getItem("user") || "[]"));
  const [error, setError] = useState(true);


  const handleChange = (e) => {
    setRegisterdata((prev) => ({ ...prev, id: uuidv4(), [e.target.name]: e.target.value }))
  }

  const storedUser = JSON.parse(localStorage.getItem("user"));
  console.log(storedUser);
  const SameUserdata = storedUser?.find((user) => user.username === registerdata.username)
  console.log(SameUserdata);

  useEffect(() => {
    if (SameUserdata) {
      setError(true)
    } else {
      setError(false)
    }
  }, [SameUserdata]);


  const handleSubmit = (e) => {
    e.preventDefault()
    if (!error) {
      setData([...data, registerdata])
      const staffUser = [...data, registerdata]
      localStorage.setItem("user", JSON.stringify(staffUser))
      setRegisterdata({
        role: "hod",
        fname: "",
        lname: "",
        email: "",
        contact: "",
        department: "",
        username: "",
        password: ""
      })
      navigate("/login")
    }else{
      alert("Please Enter Different Username")
    }

  }

  const handleClick = () => {
    navigate("/login")
  }
  console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          borderRadius="25px"
          border={"0.25px solid #ccc"}
          padding={"40px"}
          maxWidth={"540px"}
          flexDirection={"row"}
          margin={"50px auto"}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
            '& .MuiTextField-root': { width: '215px' }
          }}
        >

          <div className='mb-2'>

            <FormControl>
              <RadioGroup row name='role' defaultValue="hod">
                <FormControlLabel value="hod" control={<Radio />} label="Hod" onChange={handleChange} />
                <FormControlLabel value="staff" control={<Radio />} label="Staff" onChange={handleChange} />
              </RadioGroup>
            </FormControl>
          </div>

          <FormControl sx={{ mb: 3 }} >
            <TextField variant='outlined' name='fname' value={registerdata.fname}onChange={handleChange} label='Enter First Name' type='text'  required/>
          </FormControl>

          <FormControl sx={{ ml: 3, mb: 3 }}>
            <TextField variant='outlined' name='lname' value={registerdata.lname} onChange={handleChange} required label='Enter Last Name' type='text' />
          </FormControl>

          <FormControl sx={{ mb: 3 }}>
            <TextField  name='email' value={registerdata.email} onChange={handleChange} required label='Enter Email Address' type='email' />
          </FormControl>

          <FormControl sx={{ ml: 3, mb: 3 }}>
            <TextField variant='outlined' name='contact' value={registerdata.contact} onChange={handleChange} required label='Enter Contact' type='number' />
          </FormControl>

          <FormControl sx={{ width: "215px", mb: 3 }}>
            <InputLabel id="demo-simple-select-label">Department</InputLabel>
            <Select
              name='department'
              value={registerdata.department}
              label="department"
              onChange={handleChange}
              required
            >
              {DEPARTMENT.map((department) => {
                return <MenuItem value={department}>{department}</MenuItem>
              })}
            </Select>
          </FormControl>

          <div>
            <FormControl sx={{ mb: 3 }} >
              <TextField variant='outlined' label="Username" name='username' value={registerdata.username} onChange={handleChange} required type='text' />
              {error && <Typography className='text-danger'>username is already taken</Typography>}
            </FormControl>
            <FormControl sx={{ ml: 3, mb: 3 }} >
              <TextField variant='outlined' label="Password" name='password' value={registerdata.password} onChange={handleChange} required type='password' />
            </FormControl>

          </div>
          <Button fullWidth sx={{ my: 2, display: 'block' }} type='submit' variant='contained'>Register</Button>
          <div fullWidth className='text-center'><span >Already Registered? <Button sx={{ p: 0 }} onClick={handleClick} className='no-underline mr-2'> Login</Button ></span></div>
        </Box>
      </form>
    </>
  )
}

export default Register
