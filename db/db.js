const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://mohitjj999:1fxktO5WB4EgCu4O@blogdata.swsuk8a.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("database is connected ");
}).catch((err)=>{
    console.log(err)
});

module.exports=mongoose;