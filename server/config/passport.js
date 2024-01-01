const passport = require("passport");
const LocalStrategy =
  require("passport-local").Strategy;
const GoogleStrategy =
  require("passport-google-oauth20").Strategy;
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
require("dotenv").config();

const authenticateUser = async (
  email,
  password,
  done
) => {
  try {
    if (!email || !password) {
      console.log("All fields must be filled");
      return done(null, false, {
        message: "All fields must be filled.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User account is not found.");
      return done(null, false, {
        message: "User account is not found.",
      });
    }

    const passMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passMatch) {
      console.log("Invalid credentials.");
      return done(null, false, {
        message: "Invalid credentials.",
      });
    }

    if (!user.verifiedStatus) {
      console.log(
        "User account is not verified."
      );
      return done(null, false, {
        message: "User account is not verified.",
      });
    }

    return done(null, user);
  } catch (error) {
    console.error(
      "Error authenticating user:",
      error
    );
    return done(error);
  }
};

passport.use(
  "local",
  new LocalStrategy(
    { usernameField: "email" },
    authenticateUser
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "http://localhost:3000/google/callback",
      passReqToCallback: true,
      scope: ["profile", "email"],
    },

    function (
      request,
      accessToken,
      refreshToken,
      profile,
      done
    ) {
      const {
        id: googleId,
        displayName: name,
        emails,
        photos,
      } = profile;
      const email =
        emails && emails.length > 0
          ? emails[0].value
          : "";

      if (googleId !== null) {
        User.findOne({ email })
          .then((existingUser) => {
            if (existingUser) {
              if (!existingUser.googleId) {
                existingUser.googleId = googleId;
                return existingUser.save();
              } else {
                return existingUser;
              }
            } else {
              return User.create({
                username: name,
                email: email,
                googleId: googleId,
                verifiedStatus: true,
              });
            }
          })
          .then((updatedUser) => {
            return done(null, updatedUser);
          })
          .catch((err) => {
            return done(err);
          });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
}); //specify what user data should be stored in the session after a user logs in

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    console.log(user);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
