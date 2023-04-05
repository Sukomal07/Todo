import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../index'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import Loader from '../components/Loader'

const LogIn = () => {
  const {isAuthenticated , setIsAuthenticated, loading , setLoading } = useContext(Context)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const handleSubmit = async(e) =>{
    e.preventDefault()
    setLoading(true)
    try {
      const {data}= await axios.post(`${server}/users/login`,{
        email,
        password
      },{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
      toast.success(data.message)
      setIsAuthenticated(true)
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
      setLoading(false)
      setIsAuthenticated(false)
    }
  }

  if(isAuthenticated) return <Navigate to={"/"} />
  return (
    loading ? <Loader/> :(
      <div className='login'>
      <section>
        <form  onSubmit={handleSubmit}>
        <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email" name="email"
        required placeholder='Enter Email'  />
        <input
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        type="password" name="password" 
        required placeholder='Enter Password' />
        <button disabled={loading} type="submit"  >Log In</button>
        <h4>or</h4>
        <Link to={"/signup"} >Sign Up</Link>
        </form>
      </section>
    </div>
    )
  )
}

export default LogIn
