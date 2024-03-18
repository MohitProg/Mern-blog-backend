const jwt = require("jsonwebtoken");

const Authcheck = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    // const token = req.cookies.access_token;
   
    if (!token) {
      return res.send({ success: false, msg: "please provide jwt token" });
    }

    const decode = jwt.verify(token, "thisismyblogapp");
  


    req.newuser = decode;
    next();
  } catch (error) {
    console.log(error);
    res.send({ success: false, msg: "token is not found" });
  }
};

module.exports = Authcheck;
