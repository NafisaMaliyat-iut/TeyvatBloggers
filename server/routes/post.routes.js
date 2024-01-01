const express = require("express");
const router = express.Router();

// upload media
const {uploadImage, uploadVideo} = require("../middlewares/media.middleware")

const {
    createPost, uploadSingleImage, uploadMultipleImages, uploadMultipleVideos, getAllPosts, getHomePage, deletePost,createPostPage, toggleLike, addComment, editCommment, deleteComment, editPostPage, editPost, viewSinglePostPage, addCommentFromSingleBlog, viewMyPosts} = require("../controllers/post.controllers");

router.get("/home", getHomePage);
router.get("/create-post", createPostPage);
router.get("/edit-post/:postId", editPostPage);
router.get("/view-post/:postId", viewSinglePostPage);
router.get("/view-my-posts", viewMyPosts);

router.get("/api/post/get-all-posts", getAllPosts);
router.delete("/api/post/delete-post/:postId", deletePost);
router.delete("/api/post/:postId/delete-comment/:commentId", deleteComment);
router.post("/api/post/create-post", createPost);
router.patch("/api/post/:postId/edit-comment/:commentId", editCommment)
router.post("/api/post/:postId/toggle-like", toggleLike);
router.post("/api/post/:postId/add-comment", addComment);
router.post("/api/post/single/:postId/add-comment", addCommentFromSingleBlog);
router.post("/api/post/edit-post/:postId", editPost)

router.post('/api/post/upload/single-image', uploadImage.single('image'), uploadSingleImage);
router.post('/api/post/upload/multiple-image', uploadImage.array('images', 5), uploadMultipleImages);
router.post('/api/post/upload/multiple-video', uploadVideo.array('videos', 5), uploadMultipleVideos);
module.exports = router;