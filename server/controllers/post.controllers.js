const Post = require("../models/Post.model");
const User = require("../models/User.model");

const getHomePage = async (req, res, next) => {
  try {
    const posts = await Post.find();
    const user = await User.findById(req.user.id);
    const username = user.username;
    return res.status(200).render("home", {
      posts: posts,
      username: username,
    });
  } catch (error) {
    return res.status(404).json( {
      message: "error getting home",
    });
  }
};

const viewMyPosts = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const username = user.username;
    const posts = await Post.find({username:username});
    return res.status(200).render("my-posts", {
      posts: posts,
      username: username,
    });
  } catch (error) {
    return res.status(404).json({
      message: "error getting home",
    });
  }
};

const viewSinglePostPage = async (
  req,
  res,
  next
) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    const user = await User.findById(req.user.id);
    const username = user.username;
    return res.status(200).render("single-post", {
      post: post,
      username: username,
    });
  } catch (error) {
    return res.status(404).json( {
      message: "error getting single post page",
    });
  }
};

const createPostPage = async (req, res, next) => {
  try {
    return res.status(200).render("create-post");
  } catch (error) {
    return res.status(404).json( {
      message: "error getting create post page",
    });
  }
};

const editPostPage = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    return res
      .status(200)
      .render("edit-post", { post: post });
  } catch (error) {
    return res.status(404).json( {
      message: "error getting create post page",
    });
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    // Handle errors
    console.error("Error fetching posts:", error);
    return res.status(404).json( {
      message: "error getting posts",
    });
  }
};

const createPost = async (req, res, next) => {
  try {
    const {
      title,
      thumbnail,
      content,
      videos,
      images,
    } = req.body;

    const userId = req.user.id;
    const user = await User.findById(userId);
    console.log(user);

    if (!user) {
      res
        .status(400)
        .json({ error: "No such user exists!" });
    }

    const username = user.username;
    const newPost = new Post({
      title,
      thumbnail,
      content,
      videos,
      images,
      username,
    });

    await newPost.save();
    res.status(200).json({
      message:
        "Your post was created successfully",
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message });
  }
};

const editPost = async (req, res) => {
  const {
    title,
    thumbnail,
    content,
    videos,
    images,
  } = req.body;
  const { postId } = req.params;
  console.log(req.body);
  try {
    // Fetch the existing post
    const existingPost = await Post.findById(
      postId
    );

    if (!existingPost) {
      return res
        .status(404)
        .json({ message: "Post not found" });
    }

    existingPost.title =
      title || existingPost.title;
    existingPost.thumbnail =
      thumbnail || existingPost.thumbnail;
    existingPost.content =
      content || existingPost.content;
    existingPost.videos =
      videos || existingPost.videos;
    existingPost.images =
      images || existingPost.images;
    await existingPost.save();

    res.status(200).json({
      message: "Post updated successfully!",
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({
      message: "Post could not be updated!",
    });
  }
};

const uploadSingleImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file provided" });
    }
    const photo = req.file.filename;

    res.json({
      message: "Image updated successfully",
      photo: photo,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message });
  }
};

const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files) {
      console.log("no files!");
      return res
        .status(400)
        .json({ message: "No file provided" });
    }

    const photo = req.files.map(
      (file) => file.filename
    );
    console.log("files found");
    console.log(photo);

    res.json({
      message: "Images updated successfully",
      photo: photo,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message });
  }
};

const uploadMultipleVideos = async (req, res) => {
  try {
    if (!req.files) {
      return res
        .status(400)
        .json({ message: "No file provided" });
    }

    const videos = req.files.map(
      (file) => file.filename
    );

    res.json({
      message: "Videos updated successfully",
      videos: videos,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message });
  }
};

const toggleLike = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found" });
    }
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found" });
    }

    const username = user.username;
    // Checking if the user has already liked the post
    const existingLikeIndex =
      post.likes.findIndex(
        (like) => like.username === username
      );

    if (existingLikeIndex !== -1) {
      // If the user has already liked, remove the like
      post.likes.splice(existingLikeIndex, 1);
    } else {
      // If the user has not liked, add a new like
      post.likes.push({ username });
    }

    // Save the updated post
    await post.save();

    const posts = await Post.find();
    res.status(200).json({ posts });
  } catch (error) {
    console.error("Error toggling like:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error" });
  }
};

const addCommentLogic = async (req, res) => {
  const postId = req.params.postId;
  const { comment } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json( {
      message: "error finding user",
    });
  }

  // Find the post by ID
  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json( {
      message: "error finding post",
    });
  }
  const username = user.username;
  post.comments.push({ username, comment });

  // Save the updated post
  await post.save();
};

const addComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { comment } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json( {
        message: "error finding user",
      });
    }

    // Find the post by ID
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "error finding post",
      });
    }
    const username = user.username;
    post.comments.push({ username, comment });

    // Save the updated post
    await post.save();
    res.redirect("/home");
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json( {
      message: "error posting comment",
    });
  }
};

const addCommentFromSingleBlog = async (
  req,
  res
) => {
  try {
    await addCommentLogic(req, res);
    const postId = req.params.postId;
    res.redirect(`/view-post/${postId}`);
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json( {
      message: "error posting comment",
    });
  }
};

const editCommment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { editedComment } = req.body;

    // Find the post by ID
    const post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found" });
    }

    // Find the comment within the post
    const comment = post.comments.find(
      (c) => c._id.toString() === commentId
    );
    if (!comment) {
      return res
        .status(404)
        .json({ message: "Comment not found" });
    }
    comment.comment = editedComment;

    // Save the updated post
    await post.save();

    res.status(200).json({
      message: "Comment updated successfully",
      editedComment: editedComment,
    });
  } catch (error) {
    console.error(
      "Error updating comment:",
      error
    );
    res
      .status(500)
      .json({ error: "Internal Server Error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ error: "Post not found" });
    }

    await post.deleteOne({ _id: postId });

    res.json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const post = await Post.findById(postId);

  if (!post) {
    return res
      .status(404)
      .json({ message: "Post not found" });
  }

  const comment = post.comments.find(
    (c) => c._id.toString() === commentId
  );
  if (!comment) {
    return res
      .status(404)
      .json({ message: "Comment not found" });
  }

  post.comments.pull(comment);
  await post.save();

  res.status(200).json({
    message: "Comment deleted successfully",
  });
};

module.exports = {
  createPost,
  uploadMultipleImages,
  uploadSingleImage,
  uploadMultipleVideos,
  getAllPosts,
  getHomePage,
  deletePost,
  createPostPage,
  toggleLike,
  addComment,
  editCommment,
  deleteComment,
  editPostPage,
  editPost,
  viewSinglePostPage,
  addCommentFromSingleBlog,
  viewMyPosts,
};
