const User = require("../modal/User");
const bcrypt = require("bcryptjs")
const jsonwebtoken = require("jsonwebtoken")
const validator = require("email-validator");


// signup the acount 
const signup = async (req, res) => {



  const { name, email, password } = req.body;
  if (!name) {
    return res.send({ success: false, msg: "please fill all filled" });
  }
  if (!email) {
    return res.send({ success: false, msg: "please fill all filled" });
  }
  if (!password) {
    return res.send({ success: false, msg: "please fill all filled" });
  }






  try {
    if (!validator.validate(email)) {
      return res.send({ success: false, msg: "write correct email format" });
    }


    // checking existing user
    const existuser = await User.findOne({ email: email });

    if (existuser) {
      return res.send({ success: false, msg: " user already exist exist" });
    }

    // hash pasword 
    const hashpassword = await bcrypt.hash(password, 10);

    // new user
    const newuser = new User({
      name,
      password: hashpassword,
      email,
    });

    await newuser.save();
    const authtoken = jsonwebtoken.sign(
      { id: newuser.id },
      "thisismyblogapp"
    );

    // send the message
    return res.send({
      success: true,
      msg: "user register sucessfully",
      newuser,
      authtoken,
    });



  } catch (error) {
    console.log(error);
    return res.send({ success: false, msg: "Internal Server Error" });
  }

}


// sign in account 

const signin = async (req, res) => {

  const { email, password } = req.body;

  if (!email) {
    return res.send({ success: false, msg: "please fill all filled" });
  }
  if (!password) {
    return res.send({ success: false, msg: "please fill all filled" });
  }
  if (!validator.validate(email)) {
    return res.send({ success: false, msg: "write correct Email Format" });
  }

  try {
    // checking existing user
    const userexit = await User.findOne({ email: email });
    if (!userexit) {
      return res.send({ success: false, msg: "user doesnot exist " });
    }

    // verfy the password

    const passwordverufy = await bcrypt.compare(password, userexit.password);

    if (!passwordverufy) {
      return res.send({ success: false, msg: "please check your password " });
    }


    const authtoken = jsonwebtoken.sign(
      { id: userexit.id },
      "thisismyblogapp"
    );

    // setting cookie.


    res
      .status(200)
      .cookie('access_token', authtoken, {
        httpOnly: true,
      }).send({
        success: true,
        msg: "User login Successfully",
        authtoken,
        userexit
      });




  } catch (error) {
    console.log(error);
    return res.send({ success: false, msg: "Internal Server Error" });
  }
}




const googleAuth = async (req, res) => {
  const { name, email, photourl } = req.body;

  try {

    const checkuser = await User.findOne({ email });
    console.log(checkuser)
    if (checkuser) {
      const authtoken = jsonwebtoken.sign(
        { id: checkuser.id },
        "thisismyblogapp"
      );

      res
        .status(200)
        .cookie('access_token', authtoken, {
          httpOnly: true,
        })
        .send({success:true,msg:"user Login Successfully",authtoken,checkuser})
      }else{

        const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

        const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

        const newUser = new User({
          name:
            name.toLowerCase().split(' ').join('') +
            Math.random().toString(9).slice(-4),
          email,  
          password: hashedPassword,
          photo: photourl,
        })

        await newUser.save();
        const authtoken = jsonwebtoken.sign(
          { id: newUser.id },
          "thisismyblogapp"
        );
    
        // setting cookie.
    
    
        return res.send({
          success: true,
          msg: "user register sucessfully",
          newUser,
          authtoken,
        });
  
      }
  } catch (error) {
    return res.send({ success: false, msg: "Internal Server Error" });
  }




 

}

module.exports = { signin, signup, googleAuth };