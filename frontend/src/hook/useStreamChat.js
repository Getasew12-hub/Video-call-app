import {useQuery} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GetAuthuser, GetStremeToke } from "../lib/api";
import {StreamChat} from "stream-chat"


const STERM_API_KEY="q7ycujjmw5ky";

export const useStreamChat= () => {
const [streamClient,setStreamClien]=useState(null);
let cancelded=false;

const {data:user}= useQuery({queryKey:['auth'],queryFn:GetAuthuser});

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
         streamClient.disconnectUser()
        }
       
    }
}, [user, token, streamClient])

 return {streamClient,isLoading,error}   
}