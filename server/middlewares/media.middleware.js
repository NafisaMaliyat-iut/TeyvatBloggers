const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const imageFilter = (req, file, cb) => {
  console.log("logging img file")
  console.log(file)
  const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  if (allowedImageTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const image = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      uuidv4() +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

// Single project image upload
let uploadImage = multer({
  storage: image,
  fileFilter: imageFilter,
});

const videoFilter = (req, file, cb) => {
  console.log("logging video file")
  console.log(file)
  // Accept video files only
  if (!file.originalname.match(/\.(mp4|avi|mkv)$/)) {
    return cb(
      new Error("Choose the accepted type of video files!"),
      false
    );
  }
  cb(null, true);
};

const video = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/videos");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      uuidv4() +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

// Single project video upload
let uploadVideo = multer({
  storage: video,
  fileFilter: videoFilter, 
});

module.exports = {
  uploadImage,
  uploadVideo,
};
