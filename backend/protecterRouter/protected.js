import jwt from "jsonwebtoken"
import { ENV } from "../config/environment.js";
import user from "../model/user.js";

export const Protectedroute=async (req,res,next) => {
    console.log("now i am work ")
    try {
        const gettoken=req.cookies.token
        if(!gettoken) return res.status(401).json({error:'Unauthorized'});
      
       const decode= jwt.verify(gettoken,ENV.TOKEN_KEY);
       
       if(!decode)  return res.status(401).json({error:'Unauthorized'});

       const getuser=await user.findById(decode.id);
       if(!getuser) return res.status(401).json({error:'Unautorized'});

       req.user=getuser;
   console.log(req.user)
       next()
        
    } catch (error) {
        console.log('error on proted router',error.message);
        return res.status(500).json({error:'Internal server error'})
        
    }
}