import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.mongo_url!)
        console.log("mongoDB Connected !!")
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("MongoDB Connected successfully")
        })
        connection.on('error',(err)=>{
            console.log("MongoDB connection Error.Make sure MongoDB is running", + err)
            process.exit();
        })
    } catch (error) {
        console.log("Somethingwent wrong")
        console.error(error)
    }
}