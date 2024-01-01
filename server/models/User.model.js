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
});

const User = mongoose.model("User", UserSchema);
module.exports = User;