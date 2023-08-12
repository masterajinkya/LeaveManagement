import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';



function NavBars() {

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("login")
    navigate("/")
  }
  const logout = JSON.parse(localStorage.getItem("login"))
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Leave Application
            </Typography>
            <Link className='link' to={"/"}  >HOME</Link>
            {/* {logout ? "" : <Link className='link' to={"login"} >LOGIN</Link>} */}
            {/* <Link className='link' to={"login"} >LOGIN</Link> */}
            {logout ?<Link onClick={handleLogout} className='link' sx={{ color: 'white' }}  >LOGOUT</Link> : <Link className='link' to={"login"} >LOGIN</Link>}
            {/* <Link onClick={handleLogout} className='link' sx={{ color: 'white' }}  >LOGOUT</Link> */}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default NavBars
