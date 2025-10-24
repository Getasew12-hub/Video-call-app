import { generateStrimToken } from "../config/strem.js"

export const getStimeToken=async (req,res) => {
try {
    const token=generateStrimToken(req.user._id);
    return res.satus(200).json(token);
    
} catch (error) {
    console.log("error on getstime token ",error);
    return res.satus(500).json({error:'Internal server error'})
}
}