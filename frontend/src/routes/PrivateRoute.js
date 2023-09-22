import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const PrivateRoute = ({token}) => {
  return (
    <>
    {localStorage.getItem('token') ? (<> <div className='mb-14'><Navbar /></div> <Outlet /></>) : <Navigate to={'/user'} />}
    </>
  )
}

export default PrivateRoute