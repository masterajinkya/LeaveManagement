import React from 'react'
import NavBars from '../../components/NavBars'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <>
<NavBars/>
<Outlet/>
    </>
  )
}

export default RootLayout
