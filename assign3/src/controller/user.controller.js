import { asynchandler } from "express-async-handler"

const registerUser = asynchandler(async(req,res)=>{
    res.status(200).json({
        message: "User registered successfully"
    })
})

export default registerUser