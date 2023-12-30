const Post = require("../models/Post.model");
const User = require("../models/User.model");

const createPost = async (req, res, next) => {
  try {
    const {
      title,
      thumbnail,
      content,
      videos,
      images,
    } = req.body;
    // console.log("logging the viedos and images")
    // console.log(videos)
    // console.log(images)

    const userId = req.user.id
    const user = await User.findById(userId);
    console.log(user);
    console.log(typeof(user));

    if (!user) {
      res
        .status(400)
        .json({ error: "No such user exists!" });
    }

    // let video = [];
    // let image = [];
    // if (images) {
    //   image = images.map((file) => file.filename);
    // }
    // if (videos) {
    //   video = videos.map((file) => file.filename);
    // }

    const newPost = new Post({
      title,
      thumbnail,
      content,
      // videos: video,
      // images: image,
      userId,
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

module.exports = {
  createPost,
};
