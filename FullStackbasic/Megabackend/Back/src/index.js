import express from 'express'
import mongoose from 'mongoose'
import {DB_NAME} from './constants'
const app = express()

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
        })
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${port}`);
        })
    }
    catch(error){
        console.log("ERROR: ",error);
        throw error;
    }
})()
*/