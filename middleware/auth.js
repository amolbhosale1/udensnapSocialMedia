// const jwt = require("jsonwebtoken");

// const User = require("../models/UserSchema");


// const Authenticate = async (req, res, next) => {
//   try {
//     const token = req.cookies.jwtoken;
//     const verifyToken = jwt.verify(token, process.env.JWTSEC);

//     const rootUser = await User.findOne({ _id: verifyToken._id});
//     if (!rootUser) { throw new Error("User not found")}
//     req.token = token;
//     req.rootUser = rootUser;
//     req.userID = rootUser._id;

//     next();

//   } catch (err) {
//     res.status(401).send("Unauthorized:No token");
//     console.log("No Token");

//   }
// }

// module.exports = Authenticate;

const jwt = require("jsonwebtoken");

const User = require("../models/UserSchema");


const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, process.env.JWTSEC);

    const rootUser = await User.findOne({ _id: verifyToken._id,"tokens.token": token}).select("-password");
    if (!rootUser) { throw new Error("User not found")}
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();

  } catch (err) {
    res.status(401).send("Unauthorized:No token");
    console.log("No Token");

  }
}

module.exports = Authenticate;
