const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  videos: [
    {
      type: String,
    },
  ],
  images: [
    {
      type: String,      
    },
  ],
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
