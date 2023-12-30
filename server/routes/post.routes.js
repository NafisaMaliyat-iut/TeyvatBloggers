const express = require("express");
const router = express.Router();

// upload media
const {uploadPostImage, uploadPostVideo} = require("../middlewares/media.middleware")

const {
    createPost, 
    } = require("../controllers/post.controllers");

router.post("/create-post", uploadPostImage.single('thumbnail'), uploadPostImage.array('images', 5), uploadPostVideo.array('videos', 5), createPost);

module.exports = router;