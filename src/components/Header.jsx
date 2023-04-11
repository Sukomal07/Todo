import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context} from '../index'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const Header = () => {
    const { isAuthenticated, setIsAuthenticated , loading , setLoading  } = useContext(Context)
    const handleLogout = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/users/logout`, 
            {
                withCredentials: true
            })
            toast.success(data.message)
            setIsAuthenticated(false)
            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
            setIsAuthenticated(true)
            setLoading(false)
        }
    }
    return (
        <nav className='header'>
        <div className='logo'>
            <h2>Todo App</h2>
        </div>
        <article>
            <Link to={"/"} >Home</Link>
            <Link to={"/profile"} >Profile</Link>
            {
                isAuthenticated ? (
                    <button disabled={loading} onClick={handleLogout} className='btn'>Log Out</button>
                ) : (
                    <Link to={"/login"} >Log in</Link>
                )
            }
        </article>
        </nav>
    )
}

export default Header
