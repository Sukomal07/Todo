import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./index";
function App() {
  const {setUser, setIsAuthenticated , setLoading} = useContext(Context)
  useEffect(() =>{
    setLoading(true)
    axios.get(`${server}/users/me`,{
      withCredentials:true
    }).then((res) =>{
      setUser(res.data.user)
      setIsAuthenticated(true)
      setLoading(false)
    }).catch((error) =>{
      setUser({})
      setIsAuthenticated(false)
      setLoading(false)
    })
  },[setUser, setIsAuthenticated, setLoading])
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
      <Toaster/>
    </Router>
  );
}

export default App;
