import React, { useState } from 'react'


const google_urlstartup="http://localhost:5000/api/authgoogle/google"
function SignupPage() {
 


  return (
    <div className='min-h-screen w-screen bg-gradient-to-br from-sky-800 to-purple-950 flex justify-center items-center '>
     <div className='p-10 rounded-md shadow-md shadow-gray-900 text-center '>
        <h1 className='font-bold text-white text-3xl  sm:text-5xl mb-10'>Sign in to Stack</h1>
      <a href={google_urlstartup} className='bg-sky-700'>  <div className='bg-sky-700 bg-opacity-35 shadow-sm shadow-gray-900 p-2 rounded-md flex justify-center items-center gap-3'>
            <img src="/icons8-google.svg" alt="google icon" />
           <span className='text-white font-bold '>Sign in with Google</span>  
        </div>
        </a>
     </div>

    </div>
  )
}

export default SignupPage