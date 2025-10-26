import { StreamChat } from 'stream-chat';
import { ENV } from './environment.js';

const client =  StreamChat.getInstance(ENV.STRIM_API_KEY, ENV.STRIMG_API_SECRET);

export const userupsert=async (data) => {
  try {
    
     await client.upsertUser(data);
     console.log("user saved into strem sucessfuly",data.name)
  } catch (error) {
    console.log("error on user upser",error)
  }
 
}


export const generateStrimToken=async (userid) => {
  try {
    const id=userid.toString();
    const token = client.createToken(id);
  
    return token;
    
  } catch (error) {
    console.log('error on generate strim token',error);
    return null;
  }
}

export const Addnewmember=async(user)=>{
  console.log("the user id this",user)
  try {
    
    const publicChannel=await client.queryChannels({channelType:"public"});
    for(const channel of publicChannel){
     await channel.addMembers([user])
    }
  } catch (error) {
    console.log("error on add  new membe ",error)
  }
}