import {useQuery} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GetStremeToke } from "../lib/api";
import {StreamChat} from "stream-chat"


const STERM_API_KEY=import.meta.env.STRIM_API_KEY;

export const useSreameChat=async () => {
const [streamClient,setStreamClien]=useState(null);
let cancelded=false;

const {data:user}=useQuery({queryKey:['auth']});

const {data:token,isLoading,error}=useQuery({
    queryKey:['streamtoken'],
    queryFn:GetStremeToke,
    enabled:!!user?._id,
 });

useEffect(()=>{

    if(!user || !token) return;

    const connect=async () => {
        try {
            const client= StreamChat.getInstance(STERM_API_KEY);
           
            await client.connectUser({
                id:user._id,
                name:user.name,
                

            },
        token)

    if(!cancelded){
        setStreamClien(client);
    }
        } catch (error) {
            console.log("error on connected user ",error);

        }
    }

    connect()

    return ()=> {
        cancelded=true;
        if(streamClient){
         client.disconnectUser()
        }
       
    }
},[user,token])

 return {streamClient,isLoading,error}   
}