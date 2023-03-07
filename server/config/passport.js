const passport = require("passport");
const LocalStrategy = require("passport-local");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");

const UserColl = require("../models/user.model");
const config = require("./config");

const localLogin = new LocalStrategy({ usernameField: "phoneNumber" },
  async (phoneNumber, password, done) => {
    let user = await UserColl.findOne({ phoneNumber });
    if (!user) {
      done({
        status: 400,
        message: "User not found.!"
      });
    } else {
      try {
        if (bcrypt.compareSync(password, user.password)) {
          user = user.toObject();
          delete user.password;
          done(null, user);
        } else {
          done({ status: 400, message: "Password is incorrect..!" });
        }
      } catch (e) {
        // console.log(e, "==>", user);
        return done(e);
      }
    }
  }
);

const jwtLogin = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'mysecret'
  },
  async (payload, done) => {
    let user = await UserColl.findById(payload._id);
    if (!user) {
      return done(null, false);
    }
    user = user.toObject();
    delete user.password;
    done(null, user);
  }
);

passport.use(jwtLogin);
passport.use(localLogin);

module.exports = passport;
