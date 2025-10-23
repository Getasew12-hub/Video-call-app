import mongoose from "mongoose";
import { ENV } from "./environment.js";


export const  monogdb=async () => {
    try {
        const conne=await mongoose.connect(ENV.DB_URL);
        console.log("mongoose databse connection :", conne.connection.host)
    } catch (error) {
        console.log("faild connect to database",error)
        process.exit(1)
    }
}