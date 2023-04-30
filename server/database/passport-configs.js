const LocalStrategy = require("passport-local").Strategy;
require("../database/database.js");
const bcrypt = require("bcryptjs");

const User = require("../models/User.js");

function initialize(passport) {
  const authenticateUsers = async (phone, password, done) => {
    const user = User.findOne({
      where: { Phone: phone },
    });

    if (user == null) {
      return done(null, false, {
        sucess: 0,
        message: "No User found with that Phone",
      });
    }
    try {
      if (await bcrypt.compare(password, user.Password)) {
        return done(null, user);
      } else {
        return done(null, false, { sucess: 0, message: "Password Incorrect" });
      }
    } catch (error) {
      console.log(error);
      return done(error);
    }
  };

  passport.use(
    new LocalStrategy({ usernameField: "phone" }, authenticateUsers)
  );
  passport.serializeUser((user, done) => {
    done(null, user.UserId);
  });
  passport.deserializeUser((UserId, done) => {
    User.findById(UserId, (err, user) => {
      done(err, user);
    });
  });
}

module.exports = initialize;
