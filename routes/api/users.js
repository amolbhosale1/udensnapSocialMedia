const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../../models/UserSchema");
const gravatar = require("gravatar");
const bcrypt = require('bcryptjs');
const router = express.Router();

const authenticate = require('../../middleware/auth')

router.post('/', [
  check("name", "Enter Name").not().isEmpty(),
  check("email", "Enter Email").isEmail(),
  check("password", "Enter Password").isLength({ min: 6 })],

  async (req, res) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    // console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(422).json({ errors: [{ message: "User already exist" }] });
      }

      const avator = await gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      const user = await new User({ name, email, avator, password });
      await user.save();
      // console.log(user);
      res.send("User Created");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error")
    }
  });

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
     if(isMatch){
      let token = await userLogin.generateAuthToken();
      console.log("teken is " + token);
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      res.json({ message: "Login Success", token });
     }}
  } catch (err) {
    console.log(err);
  }
});

router.get("/auth",authenticate, (req, res) => {
  res.send(req.rootUser);
 
});

router.get("/prof",authenticate, (req, res) => {
  res.send(req.rootUser);
});


router.post("/logout",authenticate, (req, res) => {
  // console.log("fds");
  res.clearCookie('jwtoken');
 res.status(200).json({msg: "Cookie Deleted"});
});

module.exports = router;
