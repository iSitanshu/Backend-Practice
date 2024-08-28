// require('dotenv').config({path:'./env'})

import dotenv from 'dotenv'

import express from 'express'
import mongoose from 'mongoose'
import {DB_NAME} from './constants.js'
import connectDB from './db/index.js'

dotenv.config({
    path: './env'
})

const app = express()

connectDB()

/* point to remember - in connecting the database to the server
1. Try catch and promise mein wrap kro 
2. Database is always in another continent - mumbai main server and us mein database
3. use asynce await 
*/

/*
(async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",() => {
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