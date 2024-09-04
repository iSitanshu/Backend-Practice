// require('dotenv').config({path:'./env'}) chal jaega lekin code consistency ko kharab krta hai

import dotenv from 'dotenv'
import express from 'express'
import connectDB from './db/index.js'
import { app } from './app.js'

dotenv.config({
    path: './env'
})

// const app = express()

connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running at port ${process.env.PORT}`);
    })
})
.catch((error)=> {console.log('MongoDB connection failed!!',error);
})

/* point to remember - in connecting the database to the server
1. Try catch and promise mein wrap kro 
2. Database is always in another continent - mumbai main server and us mein database
3. use asynce await 
*/

/*
(async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error) => {
            console.log("ERROR: ",error);
            throw error
        }) we connected the server 
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${port}`);
        }) we started the server
    }
    catch(error){
        console.log("ERROR: ",error);
        throw error;
    }
})()
*/


