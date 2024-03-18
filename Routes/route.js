const route = require("express").Router();
const { createblog,getblogs,updateblog,deleteblog,getsingleblog,getuservlog,individualblog} = require("../Controllers/index");
const multer = require("multer");
const { signup, signin,googleAuth } = require("../Controllers/Auth");
const uploadmidleware = multer({ dest: "uploads/" });
const Authcheck=require("../Helpers/Authcheck")

// post route with auth check

route.post("/createblog",Authcheck, uploadmidleware.single("file"), createblog);
route.put("/updateblog/:id",Authcheck,uploadmidleware.single("file"), updateblog);
route.delete("/deleteblog/:id",Authcheck, deleteblog);
route.get("/userblog",Authcheck,getuservlog);
//  withou auth check 
// route.get("/getblogs")
route.get("/getblogs/:id", getsingleblog);
route.get("/getblogs", getblogs);
route.get("/getblogs/user/:id", individualblog);

// auth route;
route.post("/signup", signup);

route.post("/signin", signin);
route.post("/google", googleAuth);

module.exports = route;
