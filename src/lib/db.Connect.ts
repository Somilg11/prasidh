import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();


export function dbConnect(){
    if(mongoose.connection.readyState >= 1){
        console.log("Already connected to MongoDB");
        return;
    }
    mongoose.connect(process.env.MONGODB_URI as string)
    console.log("Connected to MongoDB");
}