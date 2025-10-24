import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import express from "express";
import { ENV } from "../config/environment.js";
import user from "../model/user.js";
import jwt from "jsonwebtoken"
import { userupsert } from "../config/strem.js";

const router=express.Router();

router.get("/google",passport.authenticate("google",{scope:['email','profile']}));
router.get("/google/callback",passport.authenticate('google',{
    session:false,
    failureRedirect:ENV.FRONTED_FAILD_URL
}),
 async  function(req, res) {
    await generateToken(req.user._id,res)
    res.redirect(ENV.AUTH_SECCESS_REDIRECT);
  })


 passport.use("google",new GoogleStrategy({
    clientID:ENV.GOOGLE_CLIENT_ID ,
    clientSecret: ENV.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/authgoogle/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
  
const getuser=await  user.findOne({email:profile.emails[0].value});
if(!getuser){
    const newuser=await user.create({name:profile.displayName,email:profile.emails[0].value,password:'google'});
    const userdata={name:newuser.name,id:newuser._id}
    await userupsert(userdata)
  
    return cb(null,newuser)
}else{
    return cb(null,getuser)
}

  }
));




function generateToken(userid,res){
    const token=jwt.sign({id:userid},ENV.TOKEN_KEY,{expiresIn:'7d'});
   res.cookie('token',token,{
    httpOnly:true,
    sameSite:'strict',
    secure:process.env.NODE_ENV=='production',
    maxAge:1000*60*60*24*7
   })
}
export default router;


