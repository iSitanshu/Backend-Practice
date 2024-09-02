import {v2 as cloudinary} from "cloudinary"
import fs from 'fs'

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

// Upload an image
const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null
        //Upload File on cloudinary 
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })
        //file have been uploaded successfully 
        console.log("file is uploaded on cloudinary",response.url)
        return response
    }catch(error){
        fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the upload operation get failed
        return null
    }
}
// Documentation 
// const uploadResult = await cloudinary.uploader
// .upload(
//     'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//         public_id: 'shoes',
//     }
// )
// .catch((error) => {
//     console.log(error);
// });

export {uploadOnCloudinary}

/* what are we doing - 
For doing production level code - 

    1. Multer file take krta hai -> usse LocalStorage mein store kr deta hai - Middleware
    2. At this point localStorage mein file aa chuki hai
    3. LocalStorage se file le kr cloudinary mein upload kr denge
    4. Cloudinary se Server pr bhej denge
    5. Agar error aagae too LocalServer pr file unlink kr denge to prevent from malware
*/