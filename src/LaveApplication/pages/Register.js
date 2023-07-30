import { Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { DEPARTMENT } from '../constant/constant';


function Register() {

  const navigate = useNavigate()
  const [registerdata, setRegisterdata] = useState({
    role: "",
    fname: "",
    lname: "",
    email: "",
    contact: "",
    department: "",
    username: "",
    password: ""
  });

  const [data, setData] = useState(JSON.parse(localStorage.getItem("user") || "[]"));


  const handleChange = (e) => {
    setRegisterdata((prev) => ({ ...prev, id: uuidv4(), [e.target.name]: e.target.value }))
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    // data.push(registerdata)
    setData([...data, registerdata])
    const staffUser = [...data, registerdata]
    localStorage.setItem("user", JSON.stringify(staffUser))

    setRegisterdata({
      role: "",
      fname: "",
      lname: "",
      email: "",
      contact: "",
      department: "",
      username: "",
      password: ""
    })
  }

  useEffect(() => {

  }, [data]);

  // const userdata = localStorage.setItem("user",JSON.stringify([...data]))
  // console.log(userdata);

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
            {/* <FormLabel id="demo-row-radio-buttons-group-label">HOD</FormLabel>
            <Radio
              checked={selectedValue === 'hod'}
              onChange={handleRadioChange}
              onClick={() => setIsHod(1)}
              value="hod"
              name="radio-buttons"
              inputProps={{ 'aria-label': 'A' }}
            />

            <FormLabel id="demo-row-radio-buttons-group-label">STAFF</FormLabel>
            <Radio
              checked={selectedValue === 'staff'}
              onChange={handleRadioChange}

              onClick={() => setIsHod(2)}

              value="staff"
              name="radio-buttons"
              inputProps={{ 'aria-label': 'B' }}
            /> */}

            <FormControl>
              <RadioGroup row name='role'>
                <FormControlLabel value="hod" control={<Radio />} label="Hod" onChange={handleChange} />
                <FormControlLabel value="staff" control={<Radio />} label="Staff" onChange={handleChange} />
              </RadioGroup>
            </FormControl>
          </div>

          <FormControl sx={{ mb: 3 }} >
            <FormLabel>Enter Name:</FormLabel>
            <TextField variant='outlined'
              name='fname'
              value={registerdata.fname}
              onChange={handleChange} placeholder='Enter First Name'
              type='text' />
          </FormControl>

          <FormControl sx={{ ml: 3, mb: 3 }}>
            <FormLabel>Last Name:</FormLabel>
            <TextField variant='outlined' name='lname' value={registerdata.lname} onChange={handleChange} placeholder='Enter Last Name' type='text' />
          </FormControl>

          <FormControl sx={{ mb: 3 }}>
            <FormLabel>Email Address:</FormLabel>
            <TextField variant='outlined' name='email' value={registerdata.email} onChange={handleChange} placeholder='Enter Email Address' type='email' />
          </FormControl>

          <FormControl sx={{ ml: 3, mb: 3 }}>
            <FormLabel>Contact:</FormLabel>
            <TextField variant='outlined' name='contact' value={registerdata.contact} onChange={handleChange} placeholder='Enter Contact' type='number' />
          </FormControl>

          <FormControl sx={{ width: "215px", mb: 3 }}>
            <InputLabel id="demo-simple-select-label">Department</InputLabel>
            <Select
              name='department'
              value={registerdata.department}
              label="department"
              onChange={handleChange}
            >
              {DEPARTMENT.map((department) => {
                return <MenuItem value={department}>{department}</MenuItem>
              })}
            </Select>
          </FormControl>

          <div>
            <FormControl sx={{ mb: 3 }} >
              <FormLabel>UserName:</FormLabel>
              <TextField variant='outlined' name='username' value={registerdata.username} onChange={handleChange} placeholder='First Name' type='text' />
            </FormControl>
            <FormControl sx={{ ml: 3, mb: 3 }} >
              <FormLabel>Password:</FormLabel>
              <TextField variant='outlined' name='password' value={registerdata.password} onChange={handleChange} placeholder='First Name' type='password' />
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
