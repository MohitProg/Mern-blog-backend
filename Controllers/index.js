const fs = require("fs");

const Newpost = require("../modal/Post");
const createblog = async (req, res) => {

  const { id } = req.newuser;



  const token = req.cookies.access_token;

  // change the path name 
  if (req.file) {

    const { originalname, path } = req.file;

    const parts = originalname.split(".")
    var newpath = path + "." + parts[1]
    fs.renameSync(path, newpath);


  } else {
    return res.send({ success: false, msg: "please fill all the required filled" })
  }

  try {
    const { title, summary, content ,category} = req.body;

    if (!title || title == "") {
      return res.send({ success: false, msg: "please fill all the required filled" })
    }

    const newpost = new Newpost({
      user: id,
      category,
      title,
      summary,
      content,
      file: newpath
    })

    await newpost.save()

    return res.send({ success: true, msg: "Added Successfully" });
  } catch (error) {
    console.log(error)
    return res.send({ success: false, msg: "internal server error" })
  }

}



const getblogs = async (req, res) => {

  const {category}=req.query;

  const obj={};
  if (category) {
    obj.category = { $regex: category, $options: "i" };
  }
  

  try {
    const getdata = await Newpost.find(obj).populate("user", ["name"]).sort({ createdAt: -1 });

    return res.send({ success: true, getdata });


  } catch (error) {
    return res.send({ success: false, msg: "internal server error" })
  }

}

// login can delete blog
const getsingleblog = async (req, res) => {
  const postid = req.params.id;


  try {

    const getdata = await Newpost.findById(postid).populate("user", ["name","photo","email"]);
    return res.send(getdata);

  } catch (error) {
    console.log(error);
    return res.send({ success: false, msg: "internal server error" })
  }


}





// login can delete blog 
const deleteblog = async (req, res) => {
  const id = req.params.id
  try {
    const deleteblog = await Newpost.findByIdAndDelete(id);
    return res.send({ success: true, msg: "delete successfully", deleteblog });



  } catch (error) {
    console.log(error);
    return res.send({ success: false, msg: "internal server error" })
  }

};



// login update blog

const updateblog = async (req, res) => {
  const _id = req.params.id;
  let newpath = null;

  const { title, summary, content } = req.body;
  


  if (req.file) {

    const { originalname, path } = req.file;

    const parts = originalname.split(".")
    newpath = path + "." + parts[1]
    fs.renameSync(path, newpath);


  }

  try {

    const preblog = await Newpost.findById(_id);
    console.log(preblog)

    const updateitem = await Newpost.findByIdAndUpdate(_id, {
      title,
      summary,
      content,
      file: newpath?newpath:preblog.file
    });

    return res.send({ success: true, msg: "update successfully" })




  } catch (error) {
    console.log(error);
    return res.send({ success: false, msg: "internal server error" })
  }




}

// login user vlog;
const getuservlog = async (req, res) => {
  const { id } = req.newuser;
  
  

  try {

    const getdata = await Newpost.find({ user: id }).populate("user", ["name", , "email","photo"]);
    return res.send({ success: true, getdata })

  } catch (error) {

    console.log(error);

    return res.send({ success: false, msg: "internal server error" })
  }


};


const individualblog=(req,res)=>{
  const id=req.params.id

}



module.exports = { createblog, getblogs, updateblog, deleteblog, getsingleblog, getuservlog ,individualblog};