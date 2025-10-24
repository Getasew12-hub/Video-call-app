import axios from "./axios"

export const GetStremeToke=async () => {
     try {
        const respone=await axios.get("/chat/token");

        return respone.data;
     } catch (error) {
        console.log("error on getstreme token",error);

        return null;
        
     }
}
export const GetAuthuser=async () => {
        try {
      const response=await axios.get("/auth/checkauth");
      
      return response.data;
    } catch (error) {
      console.log("error on chekc auth",error)
    }
}