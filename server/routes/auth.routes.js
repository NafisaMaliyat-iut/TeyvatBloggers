const express = require("express");
const router = express.Router();

const {
    postRegister, 
    getAllUsernames,
    postLogin,
    } = require("../controllers/auth.controllers");

router.post("/register", postRegister);
router.post("/login", postLogin);
router.get("/getUsernames", getAllUsernames);

module.exports = router;