var GoogleStrategy =
  require("passport-google-oauth20").Strategy;
const User = require("./../models/User.model");
const passport = require("passport");

passport.use('google',
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "http://localhost:3000/api/auth/google/callback",
        // "https://oauth.pstmn.io/v1/vscode-callback",
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
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
      console.log("Unga Bunga");
      return done(null, profile);
    }
  )
);
// async (
//   accessToken,
//   refreshToken,
//   profile,
//   cb
// ) => {
//   try {
//     // Find or create a user using Mongoose
//     const user = await User.find({email: profile.emails[0].value})
//     console.log("user")
//     // const user = await User.find(
//     //   { googleId: profile.id },
//     //   {
//     //     $setOnInsert: {
//     //       googleId: profile.id,
//     //       name: profile.displayName,
//     //       email: profile.emails[0].value,
//     //       picture: profile.photos[0].value,
//     //     },
//     //   },
//     //   { upsert: true, new: true }
//     // );

//     return cb(null, user);
//   } catch (err) {
//     return cb(err, null);
//   }
// }
//   )
// );

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    console.log(user);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

