import express from "express";
import authRouter from "./routers/auth.router.js"
import { ENV } from "./config/environment.js";
import { monogdb } from "./config/db.js";
import passport from "passport";
import authgoogleRouter from "./routers/authgoogle.router.js";
import chatRouter from "./routers/chat.router.js"
import cookieParser from "cookie-parser";


const app=express();

const port =5000;


app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())


app.use("/api/auth",authRouter);
app.use("/api/authgoogle",authgoogleRouter)
app.use("/api/chat",chatRouter)
app.listen(ENV.PORT,()=>{
    console.log("your server rinnign on port:",ENV.PORT);
    monogdb()
})