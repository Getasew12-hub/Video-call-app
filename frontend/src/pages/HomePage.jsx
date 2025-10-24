import React from 'react'
import {useQuery,useMutation,useQueryClient} from "@tanstack/react-query"
import axios from "../lib/axios"
import {useNavigate} from "react-router-dom"

function HomePage() {
  const navigate=useNavigate()
  const query=useQueryClient()
  const {mutate,error,isPending}=useMutation({
    mutationFn:async () => {
         
          await axios.post("/auth/logout");
          return
    
    },
    onError:(error)=>{
      console.log("Faild to logout",error)
    },
    onSuccess:()=>{
      
       query.setQueryData(['auth'],null)
       
       navigate("/auth")
         
    },
    retry:false,
  })

  
  return (
    <div>
      <button className='bg-sky-500 p-4 rounded m-10' onClick={mutate}>{isPending ? "Logout..." : "Logo out form home page"}</button>
    </div>
  )
}

export default HomePage