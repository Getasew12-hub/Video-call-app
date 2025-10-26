import mongoose from "mongoose";

const schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        required:true,
    },
},{timestamps:true})



const user=mongoose.model('User',schema);


export default user;