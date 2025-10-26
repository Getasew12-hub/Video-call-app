import React, { useEffect, useState } from 'react'
import {useQuery,useMutation,useQueryClient} from "@tanstack/react-query"
import axios from "../lib/axios"
import {useNavigate, useSearchParams} from "react-router-dom"
import { useStreamChat } from '../hook/useStreamChat';
import "../style/style.css"

import {
  Chat,
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  useCreateChatClient,
} from "stream-chat-react";
import { GetAuthuser } from '../lib/api';
import { Plus } from 'lucide-react';
import CreateChannel from '../componets/CreateChannel';


function HomePage() {
  const {data:user,isLoading:laod}=useQuery({queryKey:'auth',queryFn:GetAuthuser})
const [ismodalOpen,setModalopen]=useState(false);
const [activechannel,setActiveChannel]=useState(null);
const [searchParams,setSearchParams]=useSearchParams();
const {streamClient,isLoading,error}=useStreamChat();
const data=useStreamChat()

console.log("the strema is contian this thing and it must work as expected",streamClient)
useEffect(()=>{
if(streamClient){
  
    const channelid=searchParams.get("channel");
    if(channelid){
      const channel= streamClient.channel('messages',channelid);
       console.log("i get this channal and your work on this",channel)
      setActiveChannel(channel);
    }
  }
},[searchParams,activechannel])


if(!streamClient || isLoading || laod) return <p className='text-black'>Loadding...</p>;
if(error) return <p className='text-black'>Someting is went wrong</p>;
  
  return (
    <div className='p-5 flex   bg-gradient-to-br from-sky-900  to-purple-950 h-screen '>

      <div className='  flex-grow  rounded-xl shadow-md shadow-gray-700 flex  overflow-hidden  '>
        <Chat client={streamClient}>
    {/* lefs side bar */}
    <div className=' p-3  bg-gradient-to-b from-purple-800  to-purple-950 min-h-screen'>
      
         <div className='flex justify-between items-center gap-5'>
          <div className='flex items-center gap-2 '>
            <img src="/logo.png" alt="" className='max-w-14' />
          <span className='font-bold text-3xl'>SLAP</span>
          </div>
          <div className='h-10 w-10 overflow-hidden rounded-full'>
            <img src={user.img} alt="user profile"  className='h-full w-full object-cover' />
          </div>
         </div>
           <div className='flex justify-center items-center mt-6'>

              <button className='flex justify-center items-center gap-1 create-channer_button font-bold rounded-lg  p-3 ' onClick={()=>setModalopen(true)}>
         <Plus/>
           Create channel
         </button>
         
           </div>

           {/*to to get  channales */}

           <div></div>


       
    </div>
    {/* right side bar */}
    <div className='bg-white flex-grow '>
       <Channel channel={activechannel}>
        <Window>
        <MessageList/>
        <MessageInput/>

        </Window>
        <Thread/>
       </Channel>
    </div>
     {ismodalOpen &&  <CreateChannel onCose={()=>setModalopen(false)} setActiveChannel={setActiveChannel}/>}
      </Chat>



      </div>

       

    </div>
  )
}

export default HomePage