import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser" //cookies acces and can be set 
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials : true //allow cookies auth 
}))



app.use(express.json({limit : "16kb"})) // for resistng website crash beacuse of overloading
app.use(express.urlencoded({extended: true, limit: "16kb"})) //for parsing url encoded data from html forms 
// and also for resisting website crash beacuse of overloading
app.use(express.static("public")) //this states that all the static files like images, css, js files will be served from the public folder and we can access them using the url like http://localhost:8000/images/avatar.png
app.use(cookieParser()) // this middleware will parse the cookies from the request and make it available in the req.cookies object and also it will allow us to set cookies in the response using res.cookie() method

import userRouter from './routes/user.routes.js'
app.use("/api/v1/user/",userRouter) // not directly using app.get becuase we want to keep our code organize
// d and maintainable by separating routes into different files
//to get this we are getting into the middleware
// stack of express and using the userRouter for handling all routes starting with /user
// and controll is passed to userRouter for handling the specific routes like /register , /login etc which are defined in user.routes.js file

export { app };




