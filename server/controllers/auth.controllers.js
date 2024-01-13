const User = require("../models/User.model");
const path = require("path");
const bcrypt = require("bcrypt");
const passport = require("../config/passport");
const {
  transporter,
  generateToken,
} = require("../middlewares/mailer.middleware");

const getRegisterPage = async (
  req,
  res,
  next
) => {
  try {
    return res.status(200).render("register");
  } catch (error) {
    return res.status(404).json({
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
    return res.status(404).json( {
      message: "cannot access get profile page",
    });
  }
};

const getLoginPage = async (req, res, next) => {
  try {
    return res.status(200).render("login");
  } catch (error) {
    return res.status(404).json( {
      message: "cannot access get login page",
    });
  }
};

const getForgotPasswordPage = async(req,res,next)=>{
  try {
    return res.status(200).render("forgot-password");
  } catch (error) {
    return res.status(404).json( {
      message: "cannot access get forgot password page",
    });
  }
};

const getResetPasswordPage = async (req, res) => {
  try {
    return res.status(200).render("reset-password");
  } catch (error) {
    return res.status(404).json({
      message: "cannot access get reset password page",
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
      return res.status(404).json({
        message: "User already exists!",
      });
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json( {
        message: "Invalid email format",
      });
    }
    // Generate a verification token
    const verificationToken = generateToken();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(
      password,
      salt
    );

    const newUser = new User({
      username,
      email,
      password: hash,
      verificationToken,
    });

    await newUser.save();

    // Send a verification email
    const mailOptions = {
      from: "teamtento336572@gmail.com",
      to: email,
      subject: "Account Verification",
      // html: `<p>Click the following link to verify your account: <a href="http://localhost:3000/verify/${verificationToken}">Verify</a></p>`,
      html: `<p>Click the following link to verify your account: <a href="https://tevyat-bloggers.onrender.com/verify/${verificationToken}">Verify</a></p>`,
    };

    transporter.sendMail(
      mailOptions,
      (error, info) => {
        if (error) {
          console.error(error);
          return res
            .status(500)
            .json({
              error:
                "Error sending verification email",
            });
        }

        // Respond with a success message
        return res
          .status(200)
          .json({
            message:
              "Registration successful. Verification email has been sent.",
          });
      }
    );
    res.redirect("/login");
  } catch (error) {
    console.error(
      "Error during registration:",
      error
    );
    res.status(404).json( {
      message:
        "Registration failed. Please try again.",
    });
  }
};

const verifyAccount = async (req, res, next) => {
  const { token } = req.params;

  try {
      // Find the user by verification token
      const user = await User.findOne({ verificationToken: token });

      if (!user) {
          return res.status(404).json( { message: "Invalid or expired verification token" });
      }

      // Update the user as verified and remove the token
      user.verifiedStatus = true;
      user.verificationToken = undefined;
      await user.save();

      // Redirect or respond as needed
      res.redirect("/login");
  } catch (error) {
      console.error(error);
      return res.status(500).json( { error: "Internal Server Error" });
  }
};


const googleAuth = (req, res, next) => {
  passport.authenticate("google", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
};

const postLogin = (req, res, next) => {
  passport.authenticate(
    "local",
    (err, user, info) => {
      if (err) {
        console.log("passport facing error");
        return res
          .status(500)
          .json({
            error: "Could not authenticate user",
          });
      }
      if (!user) {
        return res
          .status(404)
          .json({
            error: "Invalid credentials!",
          });
      }
      req.logIn(user, (err) => {
        if (err) {
          return res
            .status(500)
            .json({
              error: "Internal Server Error",
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
    res.status(200).json({ user: user });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message });
  }
};

const changePassword = async (req, res, next) => {
  try {
    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      return res.status(400).json({
        message:
          "All password fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message:
          "New password and confirm password do not match!",
      });
    }

    const userId = req.user.id;
    const user = await User.findById(userId);

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect!",
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      message: "Password changed successfully!",
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ message: "Something went wrong!" });
  }
};

const postForgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
          return res.status(400).json({ error: "Invalid email format" });
      }

      // Check if user exists and is verified
      const existingUser = await User.findOne({ email, verifiedStatus: true });

      if (!existingUser) {
          return res.status(404).json( { message: "User not found or not verified" });
      }

      // Generate a reset token
      const resetToken = generateToken();
      const resetTokenExpiry = new Date(Date.now() + 3600000); // Token expires in 1 hour

      existingUser.resetToken = resetToken;
      existingUser.resetTokenExpiry = resetTokenExpiry;
      await existingUser.save();

      // Send a password reset email
      const mailOptions = {
        from: "teamtento336572@gmail.com",
        to: email,
        subject: "Reset Password",
        // html: `<p>Click the following link to reset your password: <a href="http://localhost:3000/reset-password/?token=${resetToken}">Verify</a></p>`,
        html: `<p>Click the following link to reset your password: <a href="https://tevyat-bloggers.onrender.com/reset-password/?token=${resetToken}">Verify</a></p>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.error(error);
              return res.status(500).json({ error: "Error sending password reset email" });
          }

          // Respond with a success message
          return res.status(200).json({ message: "Password reset email has been sent." });
      });
  } catch (error) {
      // Handle errors
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
  }
};


const postResetPassword = async (req, res, next) => {
  const { token, password } = req.body;
  console.log(token)
  console.log(password)
  try {
      // Find the user by reset token
      const user = await User.findOne({
          resetToken: token,
          resetTokenExpiry: { $gt: new Date() }, // Check if the reset token is still valid
      });

      if (!user) {
          return res.status(404).json({ message: "Invalid or expired reset token" });
      }

      // Update the password and clear reset token
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      user.password = hash;
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      await user.save();

      res.redirect("/login");
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.redirect("/login");
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
  googleAuth,
  verifyAccount,
  getForgotPasswordPage,
  postForgotPassword,
  postResetPassword,
  getResetPasswordPage
};
