import { HashIcon } from 'lucide-react';
import React from 'react'

function Channalpreview({channel,activechannel,setActiveChannel,setSearchParams}) {
         console.log("this is active channel and why this is not work as expected",activechannel)
         const isDirect=channel?.id?.split("-").pop()=='dire';
         if(isDirect) return;
    const isActive=activechannel && activechannel==channel.id;
    console.log("the active channe is data is this",isActive)
  return (
    <button className={` w-full flex items-center gap-3  font-bold p-3 rounded shadow-sm shadow-gray-900 ${isActive ? "bg-orange-950 ": "bg-gradient-to-r from-purple-950 to-orange-900"}`} onClick={()=>{
     setActiveChannel(channel.id)
     setSearchParams(channel.id)}}>
   <HashIcon size={14}/> {channel.data.id}
    </button>
  )
}

export default Channalpreview