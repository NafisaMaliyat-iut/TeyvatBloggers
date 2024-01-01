const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
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
} = require("../controllers/auth.controllers");
const { uploadImage } = require("../middlewares/media.middleware");
const {isLoggedIn} = require("../middlewares/auth.middleware")

router.post("/api/auth/register", postRegister);
router.post("/api/auth/login", postLogin);
router.get('/google/callback', googleAuth);
router.get("/auth/google", googleAuth);
router.get("/api/auth/logout", logout);
router.get("/api/auth/get-usernames", isLoggedIn, getAllUsernames);
router.patch("/api/auth/update-profile", isLoggedIn, uploadImage.single('image'), updateProfile);
router.patch("/api/auth/change-password", isLoggedIn, changePassword);
router.post("/api/auth/forgot-password", postForgotPassword);
router.get("/verify/:token", verifyAccount);
router.post('/api/auth/reset-password', postResetPassword);

router.get("/register", getRegisterPage);
router.get("/login", getLoginPage);
router.get("/profile", isLoggedIn, getProfilePage);
router.get("/reset-password", getResetPasswordPage);
router.get("/forgot-password", getForgotPasswordPage);
module.exports = router;
