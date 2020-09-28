const cloudinary = require("cloudinary");
const CloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");
console.log("dans cloudinary", CloudinaryStorage)

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
const storage = CloudinaryStorage({
    cloudinary,
    folder: "sneaker-pictures"
});

const fileUploader = multer({
    storage
});

module.exports = fileUploader;