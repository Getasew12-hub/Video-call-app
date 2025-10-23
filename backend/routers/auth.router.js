import express from "express";
import { Login, Logout, Signup } from "../controller/auth.controller.js";
const router=express.Router();

router.post("/signup",Signup)
router.post("/login",Login)
router.post("/Logout",Logout)

export default router;