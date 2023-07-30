import React from 'react'
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children, allowedRoles}) {
    const storedUser = JSON.parse(localStorage.getItem("login"));

    let auth ={role:storedUser.role};
  return (
    <>
      {auth.role === allowedRoles ? children : <Navigate to='/login' replace/>}
    </>
  )
}

export default ProtectedRoute
