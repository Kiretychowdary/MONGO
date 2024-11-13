const cloudinary = require('cloudinary').v2;
const fs = require('fs')


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});





const uploadCloudinary= async(localFilepath)=>{
    try{
        if(!localFilepath) return null;
        const response = await cloudinary.uploader.upload(localFilepath,{
            resource_type:"auto"
        });
       console.log(response)
        return response;
    }
    catch(err){
        console.log(err);
        fs.unlinkSync(localFilepath);    
           // remove the locally save file as the upload opreation is not done
           return null;
        }
}

module.exports = {uploadCloudinary};