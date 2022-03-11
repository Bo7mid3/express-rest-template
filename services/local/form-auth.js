const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const User = require("../../models/user");
const bcrypt = require("bcryptjs");

passport.use(new LocalStrategy({usernameField: "email", passwordField: "password"},async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return done("User doesn't exist");
        }
        if (bcrypt.compareSync(password, user.password)) {
            return done(null, user);
        }
        return done("Wrong password");
    }
    catch (err) {
        return done(err);
    }
}))

module.exports = passport.authenticate("local", { session: false });