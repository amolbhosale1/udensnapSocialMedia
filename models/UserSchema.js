const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avator: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);

  }
  next();
});

UserSchema.methods.generateAuthToken = async function () {
  try {
    let token = await jwt.sign({ _id: this._id }, process.env.JWTSEC);
    //this.tokens =await this.tokens.concat({ token: token });
    await this.save();
    return token;
    // const token = jwt.sign({_id:this._id},process.env.JWTSEC,{
    //         expiresIn: 3600 },
    //         (err,token)=>{
    //             if (err) {
    //                 throw err;
    //             }
    //             return token;
    //         })
  } catch (err) {
    console.log(err);
  }
};

const User = mongoose.model("User", UserSchema);

module.exports = User;