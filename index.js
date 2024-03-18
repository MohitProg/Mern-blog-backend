const dotenv=require("dotenv").config()



const  express=require("express");
const postroute=require("./Routes/route");
var cors = require('cors')
var cookieParser = require('cookie-parser')
const UserRoute=require("./Routes/user")
const app=express();
const port=80||process.env.PORT

// database connection 
console.log(process.env.PORT)
require("./db/db");
// using some middle ware 
app.use(express.json());

app.use(cors())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'));

// app.use("/api/user",Authroute)

app.use("/create",postroute)
app.use("/api/",postroute)
app.use("/user",UserRoute)
app.listen(port,()=>{
    console.log("server is started")
})