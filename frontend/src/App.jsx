import React from 'react'
import {Route, Routes} from "react-router"
import HomePage from './pages/homePage'
import SignupPage from './pages/SignupPage'

import Authpage from './pages/authPage'

function App() {
  return (
    <div >
      <Routes>
        <Route path='/'  element={<HomePage/>}/>
        <Route path='/signup'  element={<SignupPage/>}/>
        <Route path='/auth'  element={<Authpage/>}/>
        
      </Routes>

    </div>
  )
}

export default App