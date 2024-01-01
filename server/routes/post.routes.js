const express = require("express");
const router = express.Router();

// upload media
const {uploadImage, uploadVideo} = require("../middlewares/media.middleware")
const {isLoggedIn} = require("../middlewares/auth.middleware")
const {
    createPost, uploadSingleImage, uploadMultipleImages, uploadMultipleVideos, getAllPosts, getHomePage, deletePost,createPostPage, toggleLike, addComment, editCommment, deleteComment, editPostPage, editPost, viewSinglePostPage, addCommentFromSingleBlog, viewMyPosts} = require("../controllers/post.controllers");

router.get("/home", isLoggedIn, getHomePage);
router.get("/create-post", isLoggedIn, createPostPage);
router.get("/edit-post/:postId", isLoggedIn, editPostPage);
router.get("/view-post/:postId", isLoggedIn, viewSinglePostPage);
router.get("/view-my-posts", isLoggedIn, viewMyPosts);

router.get("/api/post/get-all-posts", isLoggedIn, getAllPosts);
router.delete("/api/post/delete-post/:postId", isLoggedIn, deletePost);
router.delete("/api/post/:postId/delete-comment/:commentId", isLoggedIn, deleteComment);
router.post("/api/post/create-post", isLoggedIn, createPost);
router.patch("/api/post/:postId/edit-comment/:commentId", isLoggedIn, editCommment)
router.post("/api/post/:postId/toggle-like", isLoggedIn, toggleLike);
router.post("/api/post/:postId/add-comment", isLoggedIn, addComment);
router.post("/api/post/single/:postId/add-comment", isLoggedIn, addCommentFromSingleBlog);
router.post("/api/post/edit-post/:postId",isLoggedIn, editPost)

router.post('/api/post/upload/single-image', isLoggedIn, uploadImage.single('image'), uploadSingleImage);
router.post('/api/post/upload/multiple-image',isLoggedIn,  uploadImage.array('images', 5), uploadMultipleImages);
router.post('/api/post/upload/multiple-video', isLoggedIn, uploadVideo.array('videos', 5), uploadMultipleVideos);
module.exports = router;