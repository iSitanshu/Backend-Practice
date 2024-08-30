import mongoose from 'mongoose'
import {DB_NAME} from '../constants.js'

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        // console.log("kar k dekh ",connectionInstance);
        // console.log("kar k dekh connection",connectionInstance.connection);
        // console.log("kar k dekh connection host",connectionInstance.connection.host);
        
    }catch(error){
        console.log("MONGODB CONNECTION ERROR",error);
        process.exit(1)
    }
}

export default connectDB