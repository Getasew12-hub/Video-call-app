import React from 'react'
import {Navigate, Route, Routes} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import Authpage from './pages/authPage'
import { useQuery } from '@tanstack/react-query'

import { GetAuthuser } from './lib/api'

function App() {
const {data:user,error,isPending}=useQuery({queryKey:['auth'], queryFn:GetAuthuser})

if(isPending) return "Loadding..."
  console.log("this is the usr data and use can use if for different purpose guys",user)
  return (
    <div >
      <Routes>
        <Route path='/'  element={user ? <HomePage/> : <Navigate to={"/auth"} />}/>
        <Route path='/signup'  element={!user ? <SignupPage/> : <Navigate to={"/"}/>}/>
        <Route path='/auth'  element={!user ? <Authpage/> : <Navigate to={"/"}/>}/>
        
      </Routes>
<Toaster/>
    </div>
  )
}

export default App