import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"
//alternative of this 
// import dotenv from "dotenv";
// dotenv.config();

const connectDB = async()=> {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB host : ${mongoose.connection.host}`);
        
    }catch (error){
        console.log("MongoDB ERROR",error);
        process.exit(1);       
    }
}

export default connectDB;