const mongoose=require("mongoose");

const User=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

    photo:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }


},{timestamps:true});
module.exports=mongoose.model("User",User);

