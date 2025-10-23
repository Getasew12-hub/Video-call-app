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
    const id=userid.toSting()
    const token = client.createToken(id);
    return token;
    
  } catch (error) {
    console.log('error on generate strim token',error);
    return null;
  }
}