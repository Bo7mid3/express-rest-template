const passport = require("passport");
const tokenAuth = require("../services/local/auth/token-auth");

module.exports = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origins: ["*"],
      handlePreflightRequest: (req, res) => {
        const headers = {
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
          "Access-Control-Allow-Credentials": true,
        };
        res.writeHead(200, headers);
        res.end();
      },
    },
    methods: ["GET", "POST"],
  });

  const wrapMiddlewareForSocketIo = (middleware) => (socket, next) => {
    middleware(socket.request, {}, next);
  };
  io.use(wrapMiddlewareForSocketIo(passport.initialize()));
  io.use(wrapMiddlewareForSocketIo(tokenAuth));

  io.on("connection", async (socket) => {
    socket.on("join", (msg) => console.log(socket.request.user));
  });
};
