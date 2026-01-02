import { error } from "console";
import mongoose from "mongoose";

export async function connect(){

    try {
        mongoose.connect(process.env.MONGO_URI!);
        const conn = mongoose.connection;

        conn.on('connected',()=>{
            console.log('MongoDB Connected Successfully');   
        })

        conn.on('error',()=>{
            console.log("MongoDB Connection Error. Please Make sure MongoDB is running." + error);
            process.exit();
        })
        
    } catch (error) {
        console.log("Error : ",error);
        
    }
}