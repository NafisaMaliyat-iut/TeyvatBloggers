const User = require("../models/User.model");
const path = require("path");
const bcrypt = require("bcrypt");
const passport = require("passport");

const postRegister = async (req, res, next) => {
  const { email, password, username } = req.body;

  const errors = [];

  try {
    const existingUser = await User.findOne({
      email: email,
    });

    if (existingUser) {
      errors.push(
        "User already exists with this email!"
      );
      return res
        .status(400)
        .json({ error: errors });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(
      password,
      salt
    );

    const newUser = new User({
      username,
      email,
      password: hash,
    });

    await newUser.save();

    res
      .status(200)
      .json({
        message: "Registration Successful!",
      });
  } catch (error) {
    console.error(
      "Error during registration:",
      error
    );
    errors.push("Please try again");
    res.status(400).json({ error: errors });
  }
};

const postLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials!" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.status(200).json({ message: "Login successful!" });
    });
  })(req, res, next);
};


const getAllUsernames = async (
  req,
  res,
  next
) => {
  try {
    const users = await User.find().select(
      "username"
    );
    res.status(200).json(users);
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message });
  }
};

module.exports = {
  postRegister,
  getAllUsernames,
  postLogin,
};
