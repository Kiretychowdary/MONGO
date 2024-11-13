const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

// Cloudinary configuration with environment variables
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Cloudinary storage setup
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'KRISHNA', // Replace with desired folder name on Clouinary
      format: async (req, file) => 'png', // dUse file format, like 'png' or 'jpg'
      public_id: (req, file) => `profile-${Date.now()}`, // Set unique public_id for each upload
    },
});

module.exports = { storage };
