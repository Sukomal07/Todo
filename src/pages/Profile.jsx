import React, { useContext } from 'react'
import { Context } from '../index'
import Loader from '../components/Loader'
import { Navigate } from 'react-router-dom'

const Profile = () => {
  const {isAuthenticated, loading , user} = useContext(Context)
  if (!isAuthenticated) return <Navigate to={"/login"}/>
  return (
    loading ? <Loader/> :(
      <div className='container'>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
    )
  )
}

export default Profile
