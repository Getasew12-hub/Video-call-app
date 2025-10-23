import React from 'react'
import { Link } from 'react-router'

function Authpage() {
  return (
    <div className='flex gap-3 justify-center items-center  bg-gradient-to-br from-sky-900  to-purple-950 min-h-screen p-3'>
        <div className=' flex justify-center items-center w-full h-full text-white  '>
              <div className='p-5 rounded-md shadow-md shadow-black  space-y-5 max-w-96'>
                    <div className='flex space-x-2  items-center '>
                        <img src="/logo.png" alt="logo image" className='max-h-10' />
                        <span className='font-bold text-4xl'>SLAP</span>
                    </div>

                    <h1 className='font-bold tracking-wider text-4xl'>Where Work Happens ✨</h1>
                    <p className="text-gray-200">
            Connect with your team instantly through secure, real-time messaging. Experience
            seamless collaboration with powerful features designed for modern teams.
          </p>

            <div className='space-y-3'>

          <div className='authbutton'>
             <span className="authbuttonicon">💬</span>
              <span>Real-time messaging</span>
          </div>
          <div className='authbutton '>
             <span className="authbuttonicon">📽️</span>
              <span>Video call and metteings</span>
          </div>
          <div className='authbutton '>
             <span className="authbuttonicon">🔐</span>
              <span>Secure and private</span>
          </div>
              </div>

     <div>
            <Link to={"/signup"}  > <button className='bg-gradient-to-r from-purple-500 via-purple-700 to-purple-900 p-3 rounded shadow-sm shadow-black font-bold  
              '>Get Startd with Slap →</button>
              </Link>
</div>

        </div>
            </div>

        <div className='hidden lg:flex lg:justify-center lg:items-center  w-full h-full'>
            <div className='shadow-sm shadow-gray-900 imageanimate'>
                <img src="/auth.png" alt="" className='max-w-[480px]' />
            </div>
        </div>

    </div>
  )
}

export default Authpage