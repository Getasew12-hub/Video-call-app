import { useQuery } from '@tanstack/react-query'
import React, { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useChatContext } from 'stream-chat-react'

function DirectMessagign({setActiveChannel,activechannel}) {
     const {client}=useChatContext()
    const [_,setSearchParams]=useSearchParams()

    console.log("active chnnae",activechannel)
    const featchuser=useCallback(async () => {
        if(!client?.user) return
             try {
                const response=await client.queryUsers({id:{$ne:client.user.id},role:{$ne:'admin'}},{name:1},{limit:20});
                return  response.users;
                
             } catch (error) {
                console.log("error on feach users in direct message",error)
            return []
             }
    },[client])
const {data:user=[],isLoading,error}=useQuery({
    queryKey:['direct-messagig'],
    queryFn:featchuser,
    enabled:!!client?.user
})

const StartDirectmessagign=async (target) => {
    if(!client?.user || !target) return
    try {
        const channalid=["dire",client.user.id,target.id].sort().join("-").slice(0,64);
        const channal= client.channel('messaging',channalid,{
            members:[client.user.id,target.id]
        });
        await channal.watch();
        setSearchParams({channel:channalid});
    

    } catch (error) {
        console.log("error on start direct messagign",error)
    }
}

if(isLoading) return <p>Feach users...</p>;
if(error) return <p>Something went wrong</p>;
if(user.length==0) return 


  return (
    <div className='space-y-3'>
        {user.map((val)=>{
            const channelid=["dire",client.user.id,val.id].sort().join("-").slice(0,64);
            const channel= client.channel('messaging',channelid,{members:[client.user.id,val.id]});
            
            const isActive=activechannel && activechannel==channelid;
    
            return (
                <button onClick={()=>StartDirectmessagign(val)}  className={`flex itmes-center gap-2 rounded-md shadow-sm w-full p-3 shadow-gray-800 ${isActive ?"bg-orange-950" : "bg-gradient-to-r from-purple-900 to-orange-900"}`}>
                    <div className='relative'>

                <div className='h-6 w-6 rounded-full overflow-hidden flex justify-center  items-center font-bold  '>
                   {val.img && <img src={val.img} alt=""  className='h-full w-full object-cover' />}
                   {!val.img && <p>{val.name?.charAt(0).toUpperCase() }</p>}
                    
                </div>
                 {val.online==true && <div className='absolute bottom-0 -right-1 h-2.5 w-2.5 rounded-full bg-green-500'></div>}
                    </div>
                <p>{val.name}</p>
                  
             
                </button>
            )
        })}
    </div>
  )
}

export default DirectMessagign