import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'
import "./style.css"

function Main() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default Main
