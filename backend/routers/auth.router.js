import express from "express";
import { CheckAuth, Login, Logout, Signup } from "../controller/auth.controller.js";
import { Protectedroute } from "../protecterRouter/protected.js";
const router=express.Router();

router.post("/signup",Signup)
router.post("/login",Login)
router.post("/logout",Logout)
router.get("/checkauth",Protectedroute,CheckAuth)

export default router;