const express=require("express");
const app=express();
const port=8090;
const multer=require("multer");
const path=require("path");




app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// const storage=multer.diskStorage({
//     destination:function(req,file,cb){
//         return cb(null,"./uploads");
//     },
//     filename:function(req,fil,cb){
//         return cb(null,`${file.originalname}`);

//     }
    
// });
// const upload=multer({storage});


app.get("/",(req,res)=>{
    req.render("homepage");
})

app.post("/uploads",upload.single("profileImage"),(req,res,next)=>{
    console.log(req.file);
    return req.render("/");

});

app.listen(port,()=>{
    console.log(`RADHAKRISHNALOVEISGREATEINTHEWORLD SINCE ${port}`)
})