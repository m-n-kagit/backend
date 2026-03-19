import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser" //cookies acces and can be set 
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials : true //allow cookies auth 
}))



app.use(express.json({limit : "16kb"})) // for resistng website crash beacuse of overloading
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
export { app };




