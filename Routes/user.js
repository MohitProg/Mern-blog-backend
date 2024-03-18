const route=require("express").Router();
const {Signout,Updateuser,deleteUser}=require("../Controllers/User")

route.post("/signout",Signout);


module.exports=route;