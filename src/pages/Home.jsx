import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {Context, server} from '../index'
import { toast } from 'react-hot-toast'
import TodoItems from '../components/TodoItems'
import { Navigate } from 'react-router-dom'
import Loader from '../components/Loader'
const Home = () => {
  const [title , setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [tasks, setTasks] = useState([])
  const [refresh , setRefresh] = useState(false)

  const {isAuthenticated} = useContext(Context)
  const updateHandler = async(id) =>{
    try {
      const {data} = await axios.put(`${server}/task/${id}`,{},{
        withCredentials:true
      })
      toast.success(data.message)
      setRefresh(prev => !prev)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  const deleteHandler = async(id) =>{
    try {
      const {data} = await axios.delete(`${server}/task/${id}`,{
        withCredentials:true
      })
      toast.success(data.message)
      setRefresh(prev => !prev)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  const handleSubmit = async(e) =>{
    e.preventDefault()
    setLoading(true)
    try {
      const {data} = await axios.post(`${server}/task/newtask`,{
        title,
        description,
      },{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        },
      })
      setTitle("")
      setDescription("")
      toast.success(data.message)
      setLoading(false)
      setRefresh(prev => !prev)
    } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }

  useEffect(()=>{
    axios.get(`${server}/task/mytask`,{
      withCredentials:true
    }).then((res) =>{
      setTasks(res.data.tasks)
    }).catch((error) =>{
      toast.error(error.response.data.message)
    },[refresh])
    
  })
  if(!isAuthenticated) return <Navigate to={"/login"}/>
  return (
    loading ? <Loader/> :(
      <div className='container'>
      <div className='login'>
      <section>
        <form onSubmit={handleSubmit} >
        <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text" name="title"
        required placeholder='Enter Title'  />
        <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        type="text" name="description" 
        required placeholder='Enter Description' />
        <button disabled={loading} type="submit"  >Add Task</button>
        </form>
      </section>
    </div>
      <section className="todosContainer">
        {
          tasks.map((i) => (
            <TodoItems key={i._id} title={i.title} description={i.description} isCompleted ={i.isCompleted}
            id={i._id}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}

            />
          ))
        }
      </section>
    </div>
    )
  )
}

export default Home
