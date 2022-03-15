const jwt = require("jsonwebtoken");
const User = require("../../models/user");

module.exports = (socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(socket.handshake.query.token, process.env.SECRET_KEY, async function (err, { email }) {
            if (err) return next(new Error('Authentication error'))
            socket.user = await User.findOne({ email });
            next();
        })
    }
    else {
        next(new Error('Authentication error'));
    }
}