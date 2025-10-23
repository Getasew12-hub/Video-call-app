import express from "express";
import authRouter from "./routers/auth.router.js"
import { ENV } from "./config/environment.js";
import { monogdb } from "./config/db.js";

const app=express();

const port =5000;

app.use("/api/auth",authRouter)
app.listen(ENV.PORT,()=>{
    console.log("your server rinnign on port:",ENV.PORT);
    monogdb()
})