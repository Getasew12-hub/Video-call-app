import React, { useEffect, useRef, useState } from 'react'
import {ruTranslations, useChatContext} from "stream-chat-react"
import {toast} from "react-hot-toast"
import { useSearchParams } from 'react-router-dom';
import { HashIcon, LockIcon, Users, X } from 'lucide-react';

function CreateChannel({onCose,setActiveChannel}) {
  const publicinput=useRef()
  const privateinput=useRef()
  const [channalData,setchannelData]=useState({
    name:'',
    channelType:'public',
    discription:"",
  })
  const [users,setusers]=useState([]);
  const [selectedmembers,setmembers]=useState([]);
  const [loadding,setloadding]=useState(false);
  const [isCreating,setiscreating]=useState(false);
  const [_,setSearchParams]=useSearchParams()


const {client} =useChatContext()


  useEffect(()=>{
    if(!client?.user) return;
    setloadding(true)
    const feachusers=async () => {
      try {
        const response=await client.queryUsers({id:{$ne:client.user.id}},{name:1},{limit:100})
        setusers(response.users);
    
      } catch (error) {
        console.log("erro ron get user in the stream",error)
      }finally{
        setloadding(false)
      }
    }

    feachusers()
  },[client])
  function ChangeHandler(e){
     const {name,value}=e.target;

     setchannelData((pre)=>{
      return{
        ...pre,
        [name]:value,
      }
     });
  }

  function togglemembers(id){
    if(selectedmembers.includes(id)){
      setmembers((pre)=> pre.filter((val)=> val.id!=id))
    }else{
      setmembers([...selectedmembers,id])
    }
  }
 function validation(name){
  
  if(!name.trim()) return "Channel name is required";
  if(name.trim().length<3) return "Channel name  character is must greater then 3";
  return ""
 }
  async function setForm(e){
    e.preventDefault();
   const validate=  validation(channalData.name);
   if(validate) return toast.error(validate);
setiscreating(true)
    const channaleid=channalData.name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-_]/g, "").slice(0, 20)

 const channaleformat={
  name:channalData.name,
  created_by_id:client?.user?.id,
  members:[...selectedmembers,client.user.id],
  channelType:channalData.channelType,
 }

 if(channalData.discription) channaleformat.discription=channalData.discription;
 
   try {
    const channale=  client.channel('messaging',channaleid,channaleformat);
    channale.watch()
       toast.success("Successfuly channel create")
       
     setSearchParams({channel:channale.id});
     setActiveChannel(channale.id);
    onCose()
  
   } catch (error) {
    console.log("error on create new channale",error)
   }finally{
    setiscreating(false)
   }
  }

  function Addalltomember(){
    setmembers(users.map((user)=> user.id));
  }
  function Cancel(){
    setchannelData({
      name:'',
    channelType:'public',
    discription:"",
    })
    setmembers([])
    onCose()
  }
  return (
    <div className='fixed inset-0  flex justify-center items-center  '>
      <div className='fixed inset-0 bg-black bg-opacity-30 ' onClick={()=>onCose()}></div>
          <div className='bg-gradient-to-br from-orange-900 to-purple-950 p-4 rounded-lg shadow-md shadow-gray-800 space-y-4 max-w-96 w-full relative z-50'>
             <div className='flex items-center justify-between gap-4'>
              <div className='font-bold text-2xl'>Create channal</div>
              <div>
                <button className='bg-orange-900 bg-opacity-45 border border-gray-700 rounded  p-1' onClick={onCose}>
                  <X/>
                </button>
              </div>
             </div>
      <div className='max-h-[450px] overflow-y-auto scrollbar space-y-4'>
             <div>
              <label >Channel name</label>
              <input type="text" name="name" maxLength={20} placeholder='e.g markating'  className='w-full rounded p-2 bg-transparent bg-orange-600  bg-opacity-50 outline-none  shadow-sm shadow-gray-700' onChange={ChangeHandler} value={channalData.name}/>
             </div>
             {/* preview */}

            
                 {channalData.name && <div> 
                <label >Channale id is : {channalData.name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-_]/g, "").slice(0, 20)}</label>
                </div>}

                <div className='space-y-3'>
                  <h2 className='uppercase font-bold '>Channale type</h2>
                      <div  className={`flex gap-3 items-start p-3  rounded   cursor-pointer ${channalData.channelType=='public' ?  "bg-purple-700 bg-opacity-35" :" bg-orange-800  bg-opacity-60"} `} onClick={()=> publicinput.current.click()} >
                        <input type="radio" name="channelType" value={"public"}  defaultChecked={channalData.channelType=='public'} onClick={ChangeHandler}  ref={publicinput}/>
                          <HashIcon size={18} />
                         <div>
                          <p className=' uppercase font-bold'>puplic</p>
                              <p className='uppercase text-sm'>anyone can join this channel</p>
                         </div>
                      </div>
                      <div className={`flex gap-3 items-start p-3  rounded   cursor-pointer ${channalData.channelType=='private' ?  "bg-purple-700 bg-opacity-35" :" bg-orange-800  bg-opacity-60"} `} onClick={()=> privateinput.current.click()}>
                        <input type="radio" name="channelType" value={"private"}  defaultChecked={channalData.channelType=='private'} ref={privateinput} onClick={ChangeHandler}/>
                          <LockIcon size={18}/>
                         <div>
                          <p className=' uppercase font-bold'>private</p>
                              <p className='uppercase text-sm'>only invited members join</p>
                         </div>
                      </div>

                    {channalData.channelType=='private' && <div className='space-y-3'>
                      <h2 className=' uppercase font-bold'>add members</h2>
                      <div className='flex items-center gap-5'>
                        <button disabled={users?.length==0} className={`flex items-center gap-2  bg-gradient-to-r from-orange-900 to-purple-950 relative  p-3 rounded shadow-sm shadow-gray-900 ${users.length==0 && "cursor-not-allowed after:contenst-none after:bg-gray-800 after:absolute after:inset-0 after:bg-opacity-50"} `} onClick={Addalltomember}>
                          <Users/>
                          <span className='uppercase text-sm font-bold'>Select evetyone</span>
                        </button>
                        <div className='flex items-center gap-2  bg-gradient-to-r from-orange-900 to-purple-950 p-3 rounded shadow-sm shadow-gray-900'>
                          <span>0</span>
                          <span className='uppercase text-sm font-bold'>Selected </span>
                        </div>
                      </div>

                      <div className='w-full rounded p-2 bg-transparent bg-orange-800  bg-opacity-60 shadow-sm shadow-gray-900'>
                        {loadding? (<p>Loadding..</p>):(
                          users.length==0 ? (
                            <p>user is not found</p>
                          ):(
                            users.map((val)=>{
                              //  #TODO create user profile and check box
                            })
                          )
                        )}
                      </div>
                    
                    </div>}

                    <div>
                      <label  className='uppercase font-bold'>Discription</label>
                      <textarea name="discription" className='w-full rounded p-2 bg-transparent bg-orange-600  bg-opacity-50 outline-none  shadow-sm shadow-gray-700 max-h-40' ></textarea>
                    </div>

                    <div className='flex justify-end gap-3 items-center'>
                            <button className=' bg-gradient-to-r from-orange-900 to-orange-950 p-3 rounded shadow-sm shadow-gray-900' onClick={Cancel}>Cancel</button>
                            <button className=' bg-gradient-to-tr from-purple-950 to-orange-900  p-3 rounded shadow-sm shadow-gray-900' onClick={setForm}>Create Channel</button>
                    </div>
                </div>
             </div>
          </div>
    </div>
  )
}

export default CreateChannel