import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app} from "./app.js";

dotenv.config() // to load environment variables from .env file into process.env

connectDB()
.then(()=> { 
    app.listen(process.env.PORT || 8000,()=> {
        console.log(`Server running at port: ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log(err);
    
})
/*
import express from "express"
//better approach to connect with error handling
(async () => { //ify concept 
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/{DB_NAME}`)
        app.on("error",(err)=>{
            console.log("ERR: ",err);
            throw err
        })

        app.listen(process.env.PORT,()=> {
            console.log(`App is listening on port ${process.env.PORT}`);
            
        })}
        catch (error){
            console.log("Error: ",error);
            throw error;
            
        }
    }
)() */