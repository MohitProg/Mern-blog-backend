const mongoose=require("mongoose");

const postSchema=new mongoose.Schema({


    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    
    category:{
        type:String,
    },

    title:{
        type:String,
    },
    file:{
        type:String,
    },

    summary:{
        type:String
    },

    content:{
        type:String,
    }
   
},{timestamps:true})


module.exports=mongoose.model("Post",postSchema)