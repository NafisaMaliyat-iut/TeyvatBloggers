const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  profile_image: {
    type: String,
    default:'',
  },  
  googleId: {
    type: String,
  },
  verifiedStatus: {
    type: Boolean,
    default: false,
  },
  verificationToken:{
    type:String,
  },
  resetToken: {
    type: String
  },
  resetTokenExpiry:{
    type: Date
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;