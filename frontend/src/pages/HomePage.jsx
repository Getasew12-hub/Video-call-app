import React, { useEffect, useState } from 'react'
import {useQuery,useMutation,useQueryClient} from "@tanstack/react-query"
import axios from "../lib/axios"
import {useNavigate, useSearchParams} from "react-router-dom"
import { useStreamChat } from '../hook/useStreamChat';
import "../style/style.css"
import ChannelPreview from "../componets/channalpreview"
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
import DirectMessagign from '../componets/DirectMessagign';


function HomePage() {
  const {data:user,isLoading:laod}=useQuery({queryKey:['auth'],queryFn:GetAuthuser})
const [ismodalOpen,setModalopen]=useState(false);
const [activechannel,setActiveChannel]=useState(null);
const [searchParams,setSearchParams]=useSearchParams();
const {streamClient,isLoading,error}=useStreamChat();



useEffect(()=>{
if(streamClient){
  
    const channelid=searchParams.get("channel");
    console.log("the channel user is this ",channelid)
    if(channelid){
      const channel= streamClient.channel('messages',channelid);
       console.log("the channek response in side channel id is this so you must like it",channel.DirectMessagign)
      setActiveChannel(channel.id);
    }
  }
},[searchParams,streamClient])


if(!streamClient || isLoading) return <p className='text-black'>Loading...</p>;
if(error) return <p className='text-black'>Something went wrong</p>;  return (
    <div className='p-5 flex   bg-gradient-to-br from-sky-900  to-purple-950 h-screen '>

      <div className='  flex-grow  rounded-xl shadow-md shadow-gray-700 flex  overflow-hidden  '>
        <Chat client={streamClient}>
    {/* lefs side bar */}
    <div className=' p-3  bg-gradient-to-b from-purple-800  to-purple-950 min-h-screen max-w-96'>
      
         <div className='flex justify-between items-center gap-5'>
          <div className='flex items-center gap-2 '>
            <img src="/logo.png" alt="" className='max-w-14' />
          <span className='font-bold text-3xl'>SLAP</span>
          </div>
          <div className='h-10 w-10 overflow-hidden rounded-full'>
            <img src={user?.img} alt="user profile"  className='h-full w-full object-cover' />          </div>
         </div>
           <div className='flex justify-center items-center mt-6'>

              <button className='flex justify-center items-center gap-1 create-channer_button font-bold rounded-lg  p-3 ' onClick={()=>setModalopen(true)}>
         <Plus/>
           Create channel
         </button>
         
           </div>

           {/*to to get  channales */}

           <div>
                 <ChannelList
                  filters={{members:{$in:[streamClient.user.id]}}}
                   Preview={({channel})=>(
                    <ChannelPreview channel={channel} activechannel={activechannel} setActiveChannel={(channel)=> setActiveChannel(channel)}  setSearchParams={(channel)=> setSearchParams({channel:channel})}/>
                   )}
                   List={({children,loading,error})=>
                    <div className='space-y-5 mt-6'>
                      <div className='space-y-5 h-[45vh]'>
                      <div className='uppercase font-bold  p-3 bg-purple-950 shadow-sm shadow-gray-900 '>
                        channels
                      </div>
                    {loading ? <p>Loading..</p>:
                     <div className='space-y-4'>

                       {children}
                      </div>}
                      </div>

                      <div className='space-y-3'>
                         <div className='uppercase font-bold  p-3 bg-purple-950 shadow-sm shadow-gray-900 '>
                        direct message
                      </div>
                        <DirectMessagign activechannel={activechannel} setActiveChannel={(channel)=> setActiveChannel(channel)}/>
                      </div>
                    </div>
                   }
                
                />

                 
           </div>


       
    </div>
    {/* right side bar */}
    <div className='bg-white flex-grow  border-2 border-red-600'>
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