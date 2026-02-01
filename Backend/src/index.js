import dotenv from "dotenv";
dotenv.config();
import mongoose from 'mongoose';
import {DB_NAME} from "./constants.js";
import connectDB from "./db/index.js"
import {app} from "./app.js"

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3000, ()=>{
        console.log(`listening at ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("mongoDB fails", err)
})
    
