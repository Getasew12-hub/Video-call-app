import React from 'react'
import {Route, Routes} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import HomePage from './pages/homePage'
import SignupPage from './pages/SignupPage'
import Authpage from './pages/authPage'
import { useQuery } from '@tanstack/react-query'
import axios from "./lib/axios"

function App() {
const {data,error,isLoading}=useQuery({queryKey:['auth'],
  queryFn:async()=>{
    try {
      const response=await axios.get("/auth/checkauth");
      console.log("is it not work",response)
      return response.data;
    } catch (error) {
      console.log("error on chekc auth",error)
    }
  }
})
console.log("the comming data is this",data)
  return (
    <div >
      <Routes>
        <Route path='/'  element={<HomePage/>}/>
        <Route path='/signup'  element={<SignupPage/>}/>
        <Route path='/auth'  element={<Authpage/>}/>
        
      </Routes>
<Toaster/>
    </div>
  )
}

export default App