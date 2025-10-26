import { generateStrimToken } from "../config/strem.js"

export const getStimeToken=async (req,res) => {
try {
    const token=await generateStrimToken(req.user._id);
   
    return res.status(200).json(token);
    
} catch (error) {
    console.log("error on getstime token ",error);
    return res.status(500).json({error:'Internal server error'})
}
}