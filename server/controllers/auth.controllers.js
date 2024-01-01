const User = require("../models/User.model");
const path = require("path");
const bcrypt = require("bcrypt");
const passport = require("../config/passport");

const getRegisterPage = async (
  req,
  res,
  next
) => {
  try {
    return res.status(200).render("register");
  } catch (error) {
    return res
      .status(404)
      .render("error404", {
        message:
          "cannot access get registration page",
      });
  }
};

const getProfilePage = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    console.log(user);
    return res
      .status(200)
      .render("profile", { user: user });
  } catch (error) {
    return res
      .status(404)
      .render("error404", {
        message: "cannot access get profile page",
      });
  }
};

const getLoginPage = async (req, res, next) => {
  try {
    return res.status(200).render("login");
  } catch (error) {
    return res
      .status(404)
      .render("error404", {
        message: "cannot access get login page",
      });
  }
};

const postRegister = async (req, res, next) => {
  const { email, password, username } = req.body;

  try {
    const existingUser = await User.findOne({
      email: email,
    });

    if (existingUser) {
      // User already exists
      return res.status(404).render("error404", {
        message: "User already exists!",
      });
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

    res.redirect("/login");
  } catch (error) {
    console.error(
      "Error during registration:",
      error
    );
    res.status(404).render("error404", {
      message:
        "Registration failed. Please try again.",
    });
  }
};

const googleAuth = (req, res, next) => {
  passport.authenticate('google', {
      successRedirect: '/home',
      failureRedirect: '/login',
      failureFlash: true
  })(req, res, next);
}

const postLogin = (req, res, next) => {
  passport.authenticate(
    "local",
    (err, user, info) => {
      if (err) {
        console.log("passport facing error");
        return res.status(500).render("error404", {
          message: "Internal Server Error",
        });
      }
      if (!user) {
        return res.status(404).render("error404", {
          message: "Invalid credentials!",
        });
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).render("error404", {
            message: "Internal Server Error",
          });
        }
        return res.redirect("/home");
      });
    }
  )(req, res, next);
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

const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    console.log(user);

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file provided" });
    }
    const photo = req.file.filename;

    user.profile_image = photo;
    await user.save();
    res
      .status(200)
      .json({ user:user });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message });
  }
};

const changePassword = async (req, res, next) => {
  try {

    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All password fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New password and confirm password do not match!" });
    }

    const userId = req.user.id;
    const user = await User.findById(userId);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect!" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully!" });
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ message: "Something went wrong!" });
  }
};

const logout = (req, res) => {
  req.logout((err) => {
      if (err) {
          return next(err);
      }
      req.session.destroy();
      res.redirect('/login');
  });
};

module.exports = {
  postRegister,
  getAllUsernames,
  postLogin,
  getRegisterPage,
  getLoginPage,
  getProfilePage,
  updateProfile,
  changePassword,
  logout,
  googleAuth
};
