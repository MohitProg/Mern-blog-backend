const Signout=(req,res)=>{
    try {
        res
          .clearCookie('access_token')
          .status(200)
          .send({success:true,msg:"logout sucessfully"})
      } catch (error) {
        return res.send({success:false,msg:"internal server error"})
      }
}


const Updateuser=()=>{

};

const deleteUser=()=>{

}

 module.exports={Signout,Updateuser,deleteUser}