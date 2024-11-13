// const express=require("express");
// const app=express();
// const port=8090;
// const multer=require("multer");
// const path=require("path");
// require('dotenv').config();
// const imageUrl=require("./models/img.js")
// const mongoose=require('mongoose');

// const {uploadCloudinary} = require('./utils/cloudinary')
// const upload = require("./middlewares/multer");


// app.set("view engine","ejs");
// app.set("views",path.join(__dirname,"views"));
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));



// main()
// .then((res)=>{
//     // console.log("RADHAKRISHNA IS SUCCESSFUL ");
// })
// .catch((err)=>{
//     console.log("KIRETY",err);
// });



// // mongodb://127.0.0.1:27017/test
// async function main(){
//     await mongoose.connect("mongodb://127.0.0.1:27017/imageUrl");
// }





// app.get("/",(req,res)=>{
//     res.render("homepage.ejs");
// })

// app.post("/upload",upload.single('profileImage'), async(req,res)=>{
    
//     const res1 = await uploadCloudinary(req.file.path);
//     console.log(res1);
//     return res.redirect("/");

// });

// app.listen(port,()=>{
//     console.log(`RADHAKRISHNALOVEISGREATEINTHEWORLD SINCE ${port}`)
// })







const express = require("express");
const app = express();
const port = 8090;
const path = require("path");
require("dotenv").config();
const imageUrl = require("./models/img.js");
const mongoose = require("mongoose");

const { uploadCloudinary } = require("./utils/cloudinary");
const upload = require("./middlewares/multer");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

main()
    .then(() => {
        console.log("RADHAKRISHNA IS SUCCESSFUL");
    })
    .catch((err) => {
        console.log("KIRETY", err);
    });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/imageUrl");
}

// Render homepage
app.get("/", async (req, res) => {
    try {
        const images = await imageUrl.find(); // Fetch all image URLs
        res.render("homepage", { images });
    } catch (error) {
        res.status(500).send("Error loading images");
    }
});

// Upload image to Cloudinary, save URL to MongoDB, and redirect to homepage
app.post("/upload", upload.single("profileImage"), async (req, res) => {
    try {
        const res1 = await uploadCloudinary(req.file.path);
        const newImage = new imageUrl({ url: res1.url });
        await newImage.save();
        res.redirect("/");
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).send("Error uploading image");
    }
});

app.listen(port, () => {
    console.log(`RADHAKRISHNALOVEISGREATEINTHEWORLD SINCE ${port}`);
});
