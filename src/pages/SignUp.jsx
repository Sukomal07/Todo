import React,{useContext, useState} from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import {Context, server} from '../index'
import { toast } from 'react-hot-toast'
import Loader from '../components/Loader'
const SignUp = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {isAuthenticated , setIsAuthenticated, loading , setLoading } = useContext(Context)
  const handleSubmit = async(e) =>{
    e.preventDefault()
    setLoading(true)
    try {
      const {data}= await axios.post(`${server}/users/signup`,{
        name,
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
      setIsAuthenticated(false)
      setLoading(false)
    }
  }
  if(isAuthenticated) return loading ? <Loader/> : <Navigate to={"/"} />
  return (
    loading ? <Loader/> :(
      <div className='login'>
      <section>
        <form  onSubmit={handleSubmit}>
        <input value={name} 
        onChange={(e) => setName(e.target.value)}
        type="text" name='name'
        required placeholder='Enter name'/>
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
        <button disabled={loading} type="submit" >Sign Up</button>
        <h4>or</h4>
        <Link to={"/login"} >log In</Link>
        </form>
      </section>
      </div>
    )
  )
}

export default SignUp
