import asyncHandler from "../utils/asynhandler.js"

const registerUser = asyncHandler(async(req,res)=>{
    //get user details from frontend validation
    //check if user already exists  : username , email
    //check for images, check for avatar
     // create user object and save to database
    //remove password and refresh token field from response
    //check for user creation 
    //return res

    const  {fullname, email, username, password} =req.body
    console.log("email",email)
   
})

export default registerUser