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
  logout
} = require("../controllers/auth.controllers");
const { uploadImage } = require("../middlewares/media.middleware");

router.post("/api/auth/register", postRegister);
router.post("/api/auth/login", postLogin);
router.get("/api/auth/logout", logout);
router.get("/api/auth/get-usernames", getAllUsernames);
router.patch("/api/auth/update-profile", uploadImage.single('image'), updateProfile);
router.patch("/api/auth/change-password", changePassword);

router.get("/register", getRegisterPage);
router.get("/login", getLoginPage);
router.get("/profile", getProfilePage);
module.exports = router;
