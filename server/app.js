const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // parse the body of HTTP request
const cookieParser = require("cookie-parser"); //parse cookies that are sent with HTTP request
const session = require("express-session");
const flash = require('express-flash')
const passport = require("passport");
require("./config/passport")(passport);

app.use(flash());
app.use(
  session({
    secret:"secret",
    resave: false,  // we can resave the session if nothing is change
    saveUninitialized: false,  //we can save empty value
  })
);

app.use(passport.initialize());
app.use(passport.session());

// To store image/files
app.use(express.static('./uploads'))

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const cors = require("cors");   

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, 
}));

// routes
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes")

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

//Connect to DB
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI,{
    serverSelectionTimeoutMS: 3000,
  })
  .then(() => {
    console.log("Connected to Database!");
  })
  .catch((error) => {
    console.log(error);
  });


module.exports = app;