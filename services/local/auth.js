const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const User = require("../../models/user");
const bcrypt = require("bcryptjs");

passport.use(new LocalStrategy(async (email, password, done) => {
    const user = await User.findOne({ email });
    if (!user) {
        return done("User doesn't exist");
    }
    if (user.err) {
        return done(user.err);
    }
    if (bcrypt.compareSync(password, user.password)) {
        return done(null,user);
    }
    return done("Wrong password");
}))

module.exports = passport.authenticate("local", { session: false });