import user from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ENV } from "../config/environment.js";
import { userupsert } from "../config/strem.js";


const salt=10;
function generateToken(userid,res){
    const token=jwt.sign({id:userid},ENV.TOKEN_KEY,{expiresIn:'7d'});
   res.cookie('token',token,{
    httpOnly:true,
    sameSite:'strict',
    secure:process.env.NODE_ENV=='production',
    maxAge:1000*60*60*24*7
   })
}
export const Signup=async (req,res) => {
  
   
  try {
    
    const {email,password,name}=req.body;
   
   

if(!name || !email || !password) return res.status(404).json({error:'All input is required'})

    if(name.trim().length==0 || email.trim().length==0 || password.trim().length==0){
        return res.status(404).json({type:'all',error:'All input is required'})
    }
    
   
    if(password.trim().length<6) return res.status(404).json({type:'password',error:'Password character must be greater than 5'})
 
        const userexist=await user.findOne({email});
    
        if(userexist) return  res.status(401).json({error:"User already exist"});

   
   const  hashPassword=await bcrypt.hash(password,salt);

  if(!hashPassword) return res.status(500).json({error:'Interanal server error'})

    const newuser=await user.create({name,email,password:hashPassword})
       await userupsert({id:newuser._id.toString(),name:newuser.name})

   await generateToken(newuser._id,res)

     return res.status(201).json({...newuser._doc,password:undefined})

    
  } catch (error) {
    console.log('error on singup page',error.message);
    return res.status(500).json({type:'all',error:"Internal server error"})
  }
}
export const Login=async (req,res) => {
  
    try {
        

        const {password,email}=req.body;
        if(!password || !email) return res.status(400).json({error:'All input is required'})
       const getuser=await user.findOne({email});
    
      if(!getuser) return res.status(404).json({error:'Email is not found'});
    
     
      const checkPassword=await bcrypt.compare(password,getuser.password);
      if(!checkPassword) return res.status(404).json({error:'Incorect password'});

      await generateToken(getuser._id,res);

      return res.status(200).json({...getuser._doc,password:undefined})
        
    } catch (error) {
        console.log('error on login',error.message);
        return res.status(500).json({error:'Internal server error'})
        
    }
}
export const Logout=async (req,res) => {
  console.log("now i work and you do't needd call me agia")
    try {
         res.clearCookie("token");
         return res.status(200).json({message:'success'})
    } catch (error) {
        console.log("error on logout",error.message)
        return res.status(500).json({error:'Internal server error'})
    }
   
}


export const CheckAuth=async (req,res) => {
  try {
    return res.status(200).json(req.user)
  } catch (error) {
    console.log('error on check auth',error.message);
    return res.status(500).json({error:'Internal server error'})
  }
}