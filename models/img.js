const mongo=require("mongoose");


const Url=new mongo.Schema({
    url:{
        type:String,
        required:true,
    },
});

const imageUrl=new mongo.model("image",Url);
module.exports=imageUrl;