import express from "express";
import { Protectedroute } from "../protecterRouter/protected.js";
import { getStimeToken } from "../controller/chat.controller.js";


const router=express.Router();

router.get("/token",Protectedroute,getStimeToken)
export default router;